import React, {memo, useEffect, useState} from 'react';
import {Col, Form, ListGroup, Row} from 'react-bootstrap';
import {useAppDispatch, useAppSelector} from "../hooks/hooks";
import {getCurrencyRate, iResult} from "../redux/slices/currency.slice";
import Preloader from "./UI/Preloader";

const Rates: React.FunctionComponent = () => {
    const dispatch = useAppDispatch()
    const [currenciesRates, setCurrenciesRates] = useState<iResult>({})
    const isLoading: Boolean = useAppSelector(state => state.currency.isLoading)
    const error: string = useAppSelector(state => state.currency.error)

    useEffect(() => {
        setCurrenciesRates(JSON.parse(localStorage.getItem('currency')!))

        const interval = setInterval(() => {
            dispatch(getCurrencyRate())
        }, 3600000);

        return () => clearInterval(interval);
    }, [dispatch])

    return (
        <div className={"currency"}>
            <Form className={"currency-form"}>
                {
                    error ? <Row className={"mt-3 mb-3"}><Col><p className={"error"}>{error}</p></Col></Row> : null
                }
                <ListGroup className={"overflow-auto currency-list"}>
                    {
                        !isLoading && currenciesRates.rates ? Object.keys(currenciesRates.rates).map((item, index) => {
                            return <ListGroup.Item className={"d-flex justify-content-between align-items-center currency-list__item"} key={item + index}>
                                <div>
                                    {item}
                                </div>
                                <div>
                                    {currenciesRates.rates && currenciesRates.rates[item]}
                                </div>
                            </ListGroup.Item>
                        }) : <Preloader/>
                    }
                </ListGroup>
            </Form>
        </div>
    );
};

export default memo(Rates);
