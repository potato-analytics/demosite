import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SingleProduct from "./SingleProduct";
import { getDetails } from "../redux/features/details/detailsSlice";
import { useState } from 'react';
import { Modal, Button, Form, ButtonToolbar, Input } from 'rsuite';

function Details() {

    const params = useParams(); // Products.jsx' ten navigate ile geleni burada karşılıyoruz.

    // console.log(params); // returns an object such as {id: '3'}
    // console.log(params.id); // returns 3 (depends on params)

    const dispatch = useDispatch();

    // Sayfa yüklendiğinde gelen id' ye göre ürün çekilecek.
    useEffect(() => {
        dispatch(getDetails(params.id));
    }, [dispatch, params.id]);

    const productDetails = useSelector(state => state.detailsReducer.value);

    const loading = useSelector(state => state.detailsReducer.loading);
    const Textarea = React.forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref} />);

    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
  setShowModal(true);
};

const closeModal = () => {
  setShowModal(false);
};

console.log(showModal);

    return (

        <div>
        <Modal open={showModal} onClose={closeModal}>
        <Modal.Header>
          <Modal.Title>Modal Title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        </Modal.Body>
        <Modal.Footer>
        <Form>
           <Form.Group controlId="name">
             <Form.ControlLabel>Username</Form.ControlLabel>
             <Form.Control name="name" />
             <Form.HelpText>Username is required</Form.HelpText>
           </Form.Group>
           <Form.Group controlId="password">
             <Form.ControlLabel>Password</Form.ControlLabel>
             <Form.Control name="password" type="password" autoComplete="off" />
           </Form.Group>
           <Form.Group controlId="textarea">
             <Form.ControlLabel>Textarea</Form.ControlLabel>
             <Form.Control rows={5} name="textarea" accepter={Textarea} />
           </Form.Group>
           <Form.Group>
             <ButtonToolbar>
               <Button onClick={closeModal} appearance="primary">
               Submit
               </Button>
               <Button onClick={closeModal} appearance="default">
               Cancel
               </Button>
             </ButtonToolbar>
           </Form.Group>
         </Form>
        </Modal.Footer>
      </Modal>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "35vh" }}>
            <Button onClick={openModal}>Открыть поп-ап</Button>
        </div>
            <h1 id="details-heading">DETAILS</h1>

            {loading ? <div style={{ textAlign: "center", marginTop: "200px" }}>Loading...</div> : <SingleProduct productDetails={productDetails} />}

        </div>


    )
};





export default Details;
