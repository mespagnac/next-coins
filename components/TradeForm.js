import Head from 'next/head'
import Card from '@material-tailwind/react/Card';
import CardHeader from '@material-tailwind/react/CardHeader';
import CardBody from '@material-tailwind/react/CardBody';
import Button from '@material-tailwind/react/Button';
import Input from '@material-tailwind/react/Input';
import GenericsInput from '../hooks/useFormControls';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { app } from '../firebase/client';



export default function TradeForm() {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)

    const estadoInicial = {
        portafolio: "",
        date: "",
        operation: "",
        cryptoBuy: "",
        cryptoSell: "",
        import: "",
        price: "",
        quantity: ""
    }

    const [state, setState] = useState(estadoInicial)

    useEffect(() => {
        app.auth().onAuthStateChanged(user => setUser(user))
    }, [])

    const cuandoCambiaElInput = (event) => {
        event.preventDefault()
        const { name, value } = event.target
        // console.log(name, value)
        setState({ ...state, [name]: value })

    }
    const error = () => toast.error("Upss Inserte un campo valido", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
    });

    const compraExitosa = () => toast.success("Compra Exitosa", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
    });
    const ventaExitosa = () => toast.success("Venta Exitosa", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
    });

    const enviarAlServidor = async (e) => {
        e.preventDefault()
        setLoading(true)
        const res = await axios.post('/api/operations/buy', {
            data: state,
            user: user?.uid
        })

        if (res.status === 200) {

            if (res.data.operation === 'Buy') {
                setState(estadoInicial)
                setLoading(false)
                compraExitosa()
            }
            if (res.data.operation === 'Sell') {
                setState(estadoInicial)
                setLoading(false)
                ventaExitosa()
            }
            if (res.data.operation === "Cannot read property 'current_price' of undefined") {
                setState(estadoInicial)
                setLoading(false)
                error()
            }
            if (res.data.operation === "") {
                setState(estadoInicial)
                setLoading(false)
                error()
            }

        }

        console.log(res)

    }


    return (
        <>
            <Head>
                <title>Trade | Crypto Coins</title>
            </Head>
            <Card>
                <ToastContainer />
                <CardHeader color="green" contentPosition="none">
                    <div className="w-full flex items-center justify-between">
                        <h2 className="text-white text-2xl">Trade</h2>
                        <Button
                            color="transparent"
                            buttonType="link"
                            size="lg"
                            style={{ padding: 0 }}
                        >
                            Settings
                        </Button>
                    </div>
                </CardHeader>
                <CardBody>
                    <form>
                        <h6 className="text-green-500 text-sm mt-3 mb-6 font-light">
                            Portfolio Information
                        </h6>
                        <div className="flex flex-wrap mt-10">
                            <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
                                <Input placeholder='Choose Portafolio' value={state.portafolio} onChange={cuandoCambiaElInput} outline={true} name="portafolio" list="portafolio" />
                                <datalist id="portafolio">
                                    <option>Portafolio A</option>
                                    <option>Portafolio B</option>
                                </datalist>
                            </div>
                            <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
                                <Input
                                    type="text"
                                    color="green"
                                    outline={true}
                                    placeholder="Select a Date"
                                    name="date"
                                    value={state.date}
                                    onChange={cuandoCambiaElInput}
                                />
                            </div>
                        </div>
                        <h6 className="text-green-500 text-sm mt-3 mb-6 font-light">
                            Operation
                        </h6>
                        <div className="flex flex-wrap mt-10">
                            <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
                                <Input placeholder='Operation?' value={state.operation} onChange={cuandoCambiaElInput} outline={true} name="operation" list="colors" />
                                <datalist id="colors">
                                    <option>Sell</option>
                                    <option>Buy</option>
                                </datalist>
                            </div>
                        </div>
                        <h6 className="text-green-500 text-sm mt-3 mb-6 font-light">
                            Choose Cryptocurrency
                        </h6>
                        <div className="flex flex-wrap mt-10">
                            <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
                                <Input placeholder='Choose Cryptocurrency Buy' value={state.cryptoBuy} onChange={cuandoCambiaElInput} outline={true} name="cryptoBuy" list="cryptoBuy" />
                                <datalist id="cryptoBuy">
                                    <option>Bitcoin</option>
                                    <option>Ethereum</option>
                                    <option>Cardano</option>
                                    <option>Dai</option>
                                    <option>Tether</option>
                                    <option>Solana</option>
                                    <option>Ergo</option>
                                    <option>USDC</option>
                                </datalist>
                            </div>
                            <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
                                <Input placeholder='Choose Cryptocurrency Sell' value={state.cryptoSell} onChange={cuandoCambiaElInput} outline={true} name="cryptoSell" list="cryptocurrency" />
                                <datalist id="cryptocurrency">
                                    <option>Bitcoin</option>
                                    <option>Ethereum</option>
                                    <option>Cardano</option>
                                    <option>Dai</option>
                                    <option>Tether</option>
                                    <option>Solana</option>
                                    <option>Ergo</option>
                                    <option>USDC</option>
                                </datalist>
                            </div>
                        </div>
                        <h6 className="text-green-500 text-sm my-6 font-light">
                            Values
                        </h6>
                        <div className="flex flex-wrap mt-10">
                            <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
                                <Input
                                    type="number"
                                    color="green"
                                    outline={true}
                                    placeholder={"Import" + " " + state?.cryptoSell}
                                    name="import"
                                    value={state.import}
                                    onChange={cuandoCambiaElInput}
                                />
                            </div>
                            <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
                                <Input
                                    type="number"
                                    color="green"
                                    outline={true}
                                    placeholder="Price"
                                    name='price'
                                    value={state.price}
                                    onChange={cuandoCambiaElInput}
                                />
                            </div>

                            <div className="w-full lg:w-12/12 mb-10 font-light">
                                <Input
                                    type="number"
                                    color="green"
                                    outline={true}
                                    placeholder={"Quantity" + " " + state?.cryptoBuy}
                                    name='quantity'
                                    value={state.quantity}
                                    onChange={cuandoCambiaElInput}
                                />
                            </div>

                        </div>

                        <div className="w-full flex items-center justify-between">
                            <Button
                                onClick={enviarAlServidor}
                                color="lightBlue"
                                buttonType="filled"
                                size="lg"
                                rounded={false}
                                block={true}
                                iconOnly={false}
                                ripple="light"
                            >
                                {loading ? <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Enviando...
                                </>
                                    : 'Enviar'}
                            </Button>
                        </div>
                    </form>
                </CardBody>
            </Card>
        </>
    );
}