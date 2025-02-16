import {FormEvent, useState} from "react";
import {FormContainer} from "../Components/FormContainer.tsx";
import {Button, Form, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {saveShippingAddress} from "../slices/cartSlice.ts";
import {CheckoutSteps} from "../Components/CheckoutSteps.tsx";
import {CartItem, RootState} from "../Components/Header.tsx";

export const ShippingScreen = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cart = useSelector((state:RootState) => state.cart);
    const {shippingAddress} = cart as CartItem;

    const [address, setAddress] = useState(shippingAddress?.address || '');
    const [city, setCity] = useState( shippingAddress?.city || '');
    const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || '');
    const [country, setCountry] = useState(shippingAddress?.country || '');

    const submitHandler = (e:FormEvent) => {
        e.preventDefault();
        dispatch(saveShippingAddress({address, city, postalCode, country}));
        navigate('/payment');
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 />
            <h1>Shipping</h1>

            <Form onSubmit={submitHandler}>
                <FormGroup controlId={'address'} className={'my-2'}>
                    <FormLabel>Address</FormLabel>
                    <FormControl type={'text'} placeholder={'Enter Address'}
                    value={address} onChange={(e) => setAddress(e.target.value)}>
                    </FormControl>
                </FormGroup>

                <FormGroup controlId={'city'} className={'my-2'}>
                    <FormLabel>City</FormLabel>
                    <FormControl type={'text'} placeholder={'Enter City'}
                    value={city} onChange={(e) => setCity(e.target.value)}>
                    </FormControl>
                </FormGroup>

                <FormGroup controlId={'postalCode'} className={'my-2'}>
                    <FormLabel>Postal Code</FormLabel>
                    <FormControl type={'text'} placeholder={'Enter Postal Code'}
                    value={postalCode} onChange={(e) => setPostalCode(e.target.value)}>
                    </FormControl>
                </FormGroup>

                <FormGroup controlId={'country'} className={'my-2'}>
                    <FormLabel>Country</FormLabel>
                    <FormControl type={'text'} placeholder={'Enter Country'}
                    value={country} onChange={(e) => setCountry(e.target.value)}>
                    </FormControl>
                </FormGroup>

                <Button type={'submit'} variant={'primary'} className={'my-3'}>Continue</Button>

            </Form>
        </FormContainer>
    );
};