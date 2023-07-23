import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [pizzaList, setPizzaList] = useState([]);
    const [showDelivered, setShowDelivered] = useState(true); 
    const navigate = useNavigate(); 


    useEffect(() => {
      axios
        .get("http://localhost:8000/api/pizzas")
        .then((res) => {
          setPizzaList(res.data.pizza);
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);
  
    const handleDeliveredStatusChange = (pizza, delivered) => {
      axios
        .put(`http://localhost:8000/api/pizzas/${pizza._id}/delivered`, {
          delivered: !delivered,
        })
        .then((res) => {
          navigate("/");
          setPizzaList(pizzaList.map((piz) => (piz._id === pizza._id ? { ...piz, delivered: !delivered } : piz)));
        })
        .catch((err) => {
          console.log(err);
        });
    };
    
      const handleCheckboxClick = (event, pizza) => {
        event.stopPropagation();
        handleDeliveredStatusChange(pizza);
      };


    const deletePizza = (pizza) => {
        if (window.confirm("Are you sure you want to delete this Order?") === true) {
        axios
            .delete(`http://localhost:8000/api/pizzas/${pizza._id}`)
            .then((res) => {
              navigate("/");
              setPizzaList(
                pizzaList.filter((piz) => piz._id !== pizza._id));        
            })
            .catch((err) => {
            console.log(err);
            });
        }
    };



    const filteredPizzaList = showDelivered ? pizzaList : pizzaList.filter(pizza => !pizza.delivered);
      const toggleShowDelivered = () => {
        setShowDelivered(!showDelivered);
      };

  return (
    <div className="container col-md-6 bg-dark text-light">
      <div className="d-flex justify-content-between">
        <h1 className="mb-2">Pizza Order</h1>
        <button className="btn btn-success align-center" id='orderb1' onClick={() => { navigate(`/new`); }}>
          Order a Pizza
        </button>
      </div>
      <br />
      <div className="d-flex justify-content-between">
        <h5 className="mb-2 text-left">Find stores in your area!</h5>
        <button className="btn btn-primary mb-2" onClick={toggleShowDelivered}>
        {showDelivered ? 'Hide Delivered Pizzas' : 'Show Delivered Pizzas'}
        </button>
      </div>
      <br/>
      <table className="table">
        <thead>
          <tr>
            <th className="text-center">Created At</th>
            <th className="text-center">Pizza</th>
            <th className="text-center">Size</th>
            <th className="text-center">Delivered</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredPizzaList &&
            filteredPizzaList.map(pizza => (
              <tr key={pizza._id}> 
                <td className="text-center">{pizza.createdAt}</td>
                <td className="text-center">{pizza.name}</td>
                <td className="text-center">{pizza.size}</td>
                <td className="text-center"> 
                  {pizza.delivered ? "True" : "False"}
                    <input
                      type="checkbox"
                      checked={pizza.delivered}
                      onChange={(event) => handleCheckboxClick(event, pizza)}
                      />
                 </td>   
                <td className="text-center">
                  <button
                  id = {pizza._id}
                  onClick={() => deletePizza(pizza)} 
                  className="btn btn-danger"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      &nbsp;&nbsp;
    </div>
  );
};

export default Dashboard;

