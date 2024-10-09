import c from "./FeedBack.module.css";
import { useDispatch, useSelector } from "react-redux";
import api from "../../api/index";
import { useCallback, useEffect, useState } from "react";
import * as IncidentsActions from "../../../store/incidentSlice";
import { message } from "antd";

const FeedBack = () => {
  const isAutheticated = useSelector((st) => st.LogIn.isLoged);
  const dispatch = useDispatch();
  const Incidents = useSelector((s) => s.Icidents.Incidents);

  const [Input, setInput] = useState({
    userContact: "",
    incidentCategory: "",
    description: "",
    file: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const incidentInfo = {
        ...Input,
        nameUser: isAutheticated.userName,
        departement: isAutheticated.department,
      };
      console.log(incidentInfo);

      try {
        const res = await api.post("incident/createIncident", incidentInfo);
        console.log(res.data);
        dispatch(IncidentsActions.addIncidents(res.data));
        message.success(
          "Your Feedback has been successfully created. The IT team will check it soon.",
          5
        );
      } catch (err) {
        console.error(err);
      }
    },
    [Input, dispatch]
  );
  useEffect(() => {
    handleSubmit();
  }, [handleSubmit]);

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
          <div className={c.level}>
            <h3>Describe the level of danger :</h3>
            <span style={{backgroundColor:'yellow'}}>Low</span>
            <span style={{backgroundColor:'orangered'}}>Medium</span>
            <span style={{backgroundColor:'red'}}>Hight</span>
            <p>*by default it is low </p>
          </div>

          <label>
            <p>Attach a screen if needed or a screenshot :</p>
          </label>
          <input name="file" type="file" onChange={handleInputChange} />
        </div>
        <button type="submit">Submit FeedBack </button>
      </form>
    </div>
  );
};

export default FeedBack;
