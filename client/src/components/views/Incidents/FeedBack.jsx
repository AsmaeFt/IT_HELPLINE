import c from "./FeedBack.module.css";
import { useSelector } from "react-redux";
import api from "../../api/index";
import { useCallback, useEffect, useState } from "react";

const FeedBack = () => {
  const isAutheticated = useSelector((st) => st.LogIn.isLoged);

  const [Input, setInput] = useState({
    userContact: "",
    incidentCategory: "",
    description: "",
    file: null,
  });

  console.log(Input);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = useCallback(async () => {
    try {
      const res = await api.post("incident/createIncident");
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  }, []);
  useEffect(() => {}, []);

  return (
    <div className={c.container}>
      <form onSubmit={handleSubmit}>
        <h1>if You have any issues please declare Your FeedBack</h1>
        <div className={c["user-infos"]}>
          <label>
            Name :
            <input type="text" value={isAutheticated.userName} disabled />
          </label>
          <label>
            Departement :
            <input type="text" value={isAutheticated.department} disabled />
          </label>
          <label>
            Your Contact :
            <input
              type="text"
              name="userContact"
              placeholder="your phone number to contact you"
              value={Input.userContact}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>

        <div className={c["feedback"]}>
          <label>
            Category :
            <input
              type="text"
              name="incidentCategory"
              placeholder="please mention a category ..."
              value={Input.incidentCategory}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Description :
            <textarea
              name="description"
              placeholder="Describe the problem in detailes ..."
              value={Input.description}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            <p>Attach a screen if needed or a screenshot :</p>
          </label>
          <input
            name="file"
            type="file"
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Submit FeedBack </button>
      </form>
    </div>
  );
};

export default FeedBack;
