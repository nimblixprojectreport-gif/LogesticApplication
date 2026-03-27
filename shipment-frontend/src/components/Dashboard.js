import React, { useEffect, useState, useCallback } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Dashboard() {
    const [shipments, setShipments] = useState([]);
    const [search, setSearch] = useState("");
    const [bulkStatus, setBulkStatus] = useState("Assigned");
    const [selected, setSelected] = useState([]);

    const [form, setForm] = useState({
        tracking_number: "",
        customer_name: "",
        customer_phone: "",
        pickup_address: "",
        delivery_address: "",
    });

    const loadShipments = useCallback(() => {
        let url = "http://127.0.0.1:8000/api/shipments/";
        if (search) url += `?search=${search}`;

        fetch(url)
            .then((res) => res.json())
            .then((data) => setShipments(data));
    }, [search]);

    useEffect(() => {
        loadShipments();
    }, [loadShipments]);

    const createShipment = () => {
        fetch("http://127.0.0.1:8000/api/shipments/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
        }).then(() => {
            alert("Shipment Created!");
            loadShipments();
        });
    };

    const updateStatus = (id, status) => {
        fetch(`http://127.0.0.1:8000/api/shipments/${id}/update_status/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ status }),
        }).then(() => loadShipments());
    };

    const cancelShipment = (id) => {
        fetch(`http://127.0.0.1:8000/api/shipments/${id}/cancel/`, {
            method: "POST",
        }).then(() => loadShipments());
    };

    const markRTO = (id) => {
        fetch(`http://127.0.0.1:8000/api/shipments/${id}/mark_rto/`, {
            method: "POST",
        }).then(() => loadShipments());
    };

    const handleSelect = (id) => {
        setSelected((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
        );
    };

    const bulkUpdate = () => {
        fetch("http://127.0.0.1:8000/api/shipments/bulk_update_status/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ids: selected,
                status: bulkStatus,
            }),
        }).then(() => loadShipments());
    };

    return ( <
        div className = "container mt-4" >
        <
        h2 className = "text-center mb-4" > 🚚Enterprise Shipment Management < /h2>

        { /* Create Shipment */ } <
        div className = "card mb-4 shadow" >
        <
        div className = "card-header bg-primary text-white" > Create Shipment < /div> <
        div className = "card-body" >
        <
        div className = "row g-2" > {
            Object.keys(form).map((key) => ( <
                div className = "col"
                key = { key } >
                <
                input type = "text"
                className = "form-control"
                placeholder = { key.split("_").join(" ") }
                onChange = {
                    (e) => setForm({...form, [key]: e.target.value }) }
                /> <
                /div>
            ))
        } <
        /div>

        <
        button className = "btn btn-success mt-3"
        onClick = { createShipment } >
        Create Shipment <
        /button> <
        /div> <
        /div>

        { /* Search */ } <
        div className = "card mb-4 shadow" >
        <
        div className = "card-header bg-dark text-white" > Search Shipment < /div> <
        div className = "card-body" >
        <
        input type = "text"
        className = "form-control"
        placeholder = "Search by tracking/customer"
        onChange = {
            (e) => setSearch(e.target.value) }
        /> <
        button className = "btn btn-secondary mt-2"
        onClick = { loadShipments } >
        Search <
        /button> <
        /div> <
        /div>

        { /* Table */ } <
        div className = "card shadow" >
        <
        div className = "card-header bg-info text-white" > All Shipments < /div> <
        div className = "card-body" >
        <
        table className = "table table-bordered table-striped" >
        <
        thead >
        <
        tr >
        <
        th > Select < /th> <
        th > Tracking < /th> <
        th > Customer < /th> <
        th > Status < /th> <
        th > Actions < /th> <
        /tr> <
        /thead> <
        tbody > {
            shipments.map((s) => ( <
                tr key = { s.id } >
                <
                td >
                <
                input type = "checkbox"
                onChange = {
                    () => handleSelect(s.id) }
                /> <
                /td> <
                td > { s.tracking_number } < /td> <
                td > { s.customer_name } < /td> <
                td > { s.status } < /td> <
                td >
                <
                button className = "btn btn-sm btn-success"
                onClick = {
                    () => updateStatus(s.id, "Assigned") } >
                Assign <
                /button> <
                button className = "btn btn-sm btn-primary"
                onClick = {
                    () => updateStatus(s.id, "Delivered") } >
                Deliver <
                /button> <
                button className = "btn btn-sm btn-danger"
                onClick = {
                    () => cancelShipment(s.id) } >
                Cancel <
                /button> <
                button className = "btn btn-sm btn-dark"
                onClick = {
                    () => markRTO(s.id) } >
                RTO <
                /button> <
                /td> <
                /tr>
            ))
        } <
        /tbody> <
        /table>

        { /* Bulk Update */ } <
        div className = "mt-3" >
        <
        select className = "form-select w-25 d-inline"
        onChange = {
            (e) => setBulkStatus(e.target.value) } >
        <
        option > Assigned < /option> <
        option > Picked Up < /option> <
        option > In Transit < /option> <
        option > Out
        for Delivery < /option> <
        /select>

        <
        button className = "btn btn-warning"
        onClick = { bulkUpdate } >
        Bulk Update <
        /button> <
        /div> <
        /div> <
        /div> <
        /div>
    );
}

export default Dashboard;