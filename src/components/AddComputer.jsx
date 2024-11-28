import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import logo from "../logo.svg"
import Login from './Login';

const AddComputer = () => {

    const BASE_API_URL = useMemo(() => "http://127.0.0.1:8000", [])

    // Create Or update Computer Data

    const initialData = useMemo(() => {
        return {
            id: 0,
            name: "",
            image: null,
            price: 0
        }
    }, [])

    const [data, setData] = useState(initialData)

    const handleFileChange = (e) => {
        if (e.target.files) {
            setData({
                ...data,
                image: e.target.files[0]
            })

        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("COMPUTER PAYLOAD ==== ", data);

        let form_data = new FormData();
        console.log("DATA.IMAGe === ",data.image);
        data.image !== null && form_data.append('computer_image', data.image, data.image.name);
        form_data.append('computer_id', data.id);
        form_data.append('name', data.name);
        form_data.append('price', data.price);

        axios({
            method: 'POST',
            url: `${BASE_API_URL}/create_update_computer/`,
            // headers : {
            //     "Access-Control-Allow-Credentials": true,
            //     "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            //     "Content-Type": "application/json"
            // },
            headers: {
                'content-type': 'multipart/form-data'
            },
            data: form_data
        }).
            then(res =>{
                console.log("RES ==== ", res.data.data);                
                console.log("Serializer === ", res.data.serializer);
                if(data.id === 0){
                    setComputerData([...computerData , res.data.data])
                }
                else{
                    const updatedComputerData = computerData.map((obj) =>{
                        if(obj.id === data.id){
                            return res.data.data
                        }else{
                            return obj
                        }
                    });
                    console.log("updatedComputerData ==== ",updatedComputerData);
                    setComputerData(updatedComputerData)
                }

                resetForm()
                
            }).
            catch(err => console.log("ERRR === ", err))

    }

    const resetForm = () => {
        setData(initialData);
        document.getElementById("AddComputerForm").reset();
    }

    // Get Computer Data

    const [computerData, setComputerData] = useState([]);

    useEffect(() => {
        axios({
            method: "GET",
            url: `${BASE_API_URL}/get_computer_for_react`
        }).then(res => {
            console.log("COMPUTER DATA === ", res.data);
            if (!res.data.error) {
                setComputerData(res.data.computer_data)
            }
        }). catch(err => {
                console.log("ERR === ", err);
            })
    }, [])


    return (
        <div>

            <h1>Login</h1>

            <Login />

            <hr />


            <form id='AddComputerForm' onSubmit={handleSubmit}>
                <button type='button' onClick={resetForm}>Add New</button><br />
                <label htmlFor="name">Name</label>
                <input type="text" value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} /><br />
                <label htmlFor="image">Image</label>
                <input type="file" onChange={handleFileChange} /><br />
                <label htmlFor="price">Price</label>
                <input type="number" value={data.price} onChange={(e) => setData({ ...data, price: e.target.value })} /><br />
                <button type='submit'>Submit</button>
            </form>


            <div style={{ marginTop: '20px' }}>
                {computerData.length ? (
                    <table style={{ width: '100%' }}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {computerData.map((obj) => (
                                <tr key={obj.id}>
                                    <td>{obj.id}</td>
                                    <td>
                                        <img src={obj.image} alt={"img"} style={{ width: "50px", height: '50px', objectFit: 'cover' }} />
                                        {obj.name}
                                    </td>
                                    <td>{obj.price}</td>
                                    <td>
                                        <button onClick={() => setData({...obj , image:null})}>Edit</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No Data</p>
                )}
            </div>

        </div>
    )
}

export default AddComputer