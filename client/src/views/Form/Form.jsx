import { useState } from "react";
import axios from "axios";

const Form = () => {
  const [form, setForm] = useState({
    name: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    heigth: "",
    weigth: "",
    img: "",
    type: "",
  });

  // const [errors, setErrors] = useState({
  //   name: "",
  //   hp: "",
  //   attack: "",
  //   defense: "",
  //   speed: "",
  //   heigth: "",
  //   weigth: "",
  //   img: "",
  //   type: "",
  // });

  const handlerChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    setForm({ ...form, [property]: value });
  };

  // const validate = (form) => {};

  const submitHandler = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3001/pokemons", form)
      .then((res) => alert(res));
  };

  return (
    <form onSubmit={submitHandler}>
      <div>
        <label>Name: </label>
        <input
          type="text"
          value={form.name}
          onChange={handlerChange}
          name="name"
        />
      </div>

      <div>
        <label>Hp: </label>
        <input type="text" value={form.hp} onChange={handlerChange} name="hp" />
      </div>

      <div>
        <label>Attack: </label>
        <input
          type="text"
          value={form.attack}
          onChange={handlerChange}
          name="attack"
        />
      </div>

      <div>
        <label>Defense: </label>
        <input
          type="text"
          value={form.defense}
          onChange={handlerChange}
          name="defense"
        />
      </div>

      <div>
        <label>Speed: </label>
        <input
          type="text"
          value={form.speed}
          onChange={handlerChange}
          name="speed"
        />
      </div>

      <div>
        <label>Heigth: </label>
        <input
          type="text"
          value={form.heigth}
          onChange={handlerChange}
          name="heigth"
        />
      </div>

      <div>
        <label>Weigth: </label>
        <input
          type="text"
          value={form.weigth}
          onChange={handlerChange}
          name="weigth"
        />
      </div>

      <div>
        <label>Img: </label>
        <input
          type="img"
          value={form.img}
          onChange={handlerChange}
          name="img"
        />
      </div>

      <div>
        <label>Type: </label>
        <input
          type="text"
          value={form.type}
          onChange={handlerChange}
          name="type"
        />
      </div>
      <button type="submit">Create Pokemon</button>
    </form>
  );
};

export default Form;
