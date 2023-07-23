import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const NewPizza= ({ setPizzaList, pizzaList }) => {
  const [name, setName] = useState("");
  const [size, setSize] = useState("");
  const [notes, setNotes] = useState("");
  const [error1, setError1] = useState("");
  const [error2, setError2] = useState("");
  const [error3, setError3] = useState("");
  const navigate = useNavigate();



  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (!name) {
      setError1("Name is required");
      return;
    }
  
    if (!size) {
      setError2("Size is required");
      return;
    }
  
    if (notes.length > 25) {
      setError3("Notes must container max of 25 characters");
      return;
    } else {
      setError3("");
    }

    axios.post("http://localhost:8000/api/pizzas", {
        name,
        size,
        notes,
      })
      .then((res) => {
        navigate("/");
        console.log(res);
        console.log(res.data);
        setPizzaList([...pizzaList, res.data.pizza]);
      })
      .catch((err) => console.log(err));
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="container col-md-4 bg-dark text-light"
      >
      <div className="d-flex justify-content-between">
        <h1 className="text-center mb-3">{size} {name}</h1>
        <Link to="/" className="primary"> go back home</Link>
      </div>
      <br />
      <div className="form-group">
        <label htmlFor="name">Pizza</label>
        {error1 && <p className="text-danger">{error1}</p>}
        <select
          id="name"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value )}
        >
          <option value="">Select a Pizza</option>
          <option value="Pepperoni">Pepperoni</option>
          <option value="Margherita">Margherita</option>
          <option value="Cheese">Cheese</option>
          <option value="Combination">Combination</option>
          <option value="Philly Cheese Steak">Philly Cheese Steak</option>
          <option value="Hawaiian">Hawaiian</option>
          <option value="Veggie">Veggie</option>
          <option value="Amazing_4">Amazing 4</option>
        </select>
      </div>
      <br />
      <div className="form-group">
        <label htmlFor="price">Size</label>
        {error2 && <p className="text-danger">{error2}</p>}
        <select
          id="size"
          className="form-control"
          value={size}
          onChange={(e) => setSize(e.target.value)}
        >
          <option value="">Select a Size</option>
          <option value="Single">Single</option>
          <option value="Small">Small</option>
          <option value="Medium">Medium</option>
          <option value="Large">Large</option>
        </select>
      </div>
      <br />
      <div className="form-group">
        <label htmlFor="notes">Notes</label>
        {error3 && <p className="text-danger">{error3}</p>}
        <textarea
          id="notes"
          className="form-control"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        ></textarea>

      </div>
      <br />
      <button type="submit" className="btn btn-primary">
        Order now!
      </button>
      <br />
      <br />
    </form>
  );
};

export default NewPizza;
