import React, {useEffect, useState} from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import {Line} from 'react-chartjs-2';
import {useAppDispatch, useAppSelector} from "../hooks/hooks";
import {Button, Col, Form, Row} from 'react-bootstrap';
import {getCurrencyTimeseries, iTimeseries} from "../redux/slices/timeseries.slice";
import Preloader from "./UI/Preloader";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Currency chart',
        },
    },
};

interface iDatasets {
    label: string,
    data: string[],
    borderColor: string,
    backgroundColor: string
}

interface iChartData {
    labels: string[],
    datasets: iDatasets[]

}

export default function Chart() {
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [base, setBase] = useState("")
    const [symbol, setSymbol] = useState("")
    const [dates, setDates] = useState<string[]>([])
    const [chartLabels, setChartLabels] = useState<string[]>([])

    const dispatch = useAppDispatch()
    const timeseries: iTimeseries = useAppSelector(state => state.timeseries.timeseries)
    const error = useAppSelector(state => state.timeseries.error)
    const isLoading = useAppSelector(state => state.timeseries.isLoading)


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        switch (e.target.name) {
            case "start_date":
                setStartDate(e.target.value)
                break
            case "end_date":
                setEndDate(e.target.value)
                break
            case "base":
                setBase(e.target.value)
                break
            case "symbol":
                setSymbol(e.target.value)
                break
            default:
                break
        }
    }

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(getCurrencyTimeseries({
            start_date: startDate,
            end_date: endDate,
            base,
            symbol
        }))
    }

    useEffect(() => {
        if (timeseries.rates) {
            const labels = Object.keys(timeseries.rates).map(rate => {
                return rate
            })
            const data = Object.keys(timeseries.rates).map(rate => {
                return timeseries.rates && timeseries.rates[rate][symbol]
            })
            setChartLabels(labels)
            setDates(data);
        }
    }, [timeseries, symbol])

    //const labels = chartLabels;
    const chartData: iChartData = {
        labels: chartLabels,
        datasets: [
            {
                label: symbol,
                data: dates,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ],
    };

    return (
        <>
            {
                isLoading ? <Preloader/> : null
            }
            <div>
                <Line options={options} data={chartData}/>
                {
                    error ? <Row className={"mt-3 mb-3"}><Col><p className={"error"}>{error}</p></Col></Row> : null
                }
                <Form onSubmit={handleFormSubmit}>
                    <Row className={"mt-3"}>
                        <Col>
                            <Form.Group className="mb-3" controlId="formBasicName">
                                <Form.Label>Start date</Form.Label>
                                <Form.Control
                                    type="text"
                                    name={'start_date'}
                                    value={startDate ? startDate : ""}
                                    onChange={handleChange}
                                    placeholder={"Enter date in 2022-10-20 format"}
                                    required={true}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="formBasicName">
                                <Form.Label>End date</Form.Label>
                                <Form.Control
                                    type="text"
                                    name={'end_date'}
                                    value={endDate ? endDate : ""}
                                    onChange={handleChange}
                                    placeholder={"Enter date in 2022-10-20 format"}
                                    required={true}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className={"mt-3"}>
                        <Col>
                            <Form.Group className="mb-3" controlId="formBasicName">
                                <Form.Label>Base currency</Form.Label>
                                <Form.Control
                                    type="text"
                                    name={'base'}
                                    value={base ? base : ""}
                                    onChange={handleChange}
                                    placeholder={"Enter currency ex. EUR"}
                                    required={true}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="formBasicName">
                                <Form.Label>Symbol currency</Form.Label>
                                <Form.Control
                                    type="text"
                                    name={'symbol'}
                                    value={symbol ? symbol : ""}
                                    onChange={handleChange}
                                    placeholder={"Enter currency ex. GBP"}
                                    required={true}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Button type={"submit"}>Generate chart</Button>
                </Form>
            </div>
        </>

    );
}
