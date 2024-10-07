import c from "./FeedBack.module.css";
import { useSelector } from "react-redux";

const FeedBack = () => {
  const isAutheticated = useSelector((st) => st.LogIn.isLoged);

  return (
    <div className={c.container}>
      <form>
        <h1>if You have any issues please declare Your FeedBack</h1>
        <div className={c["user-infos"]}>
          <label>
            Name :{" "}
            <input type="text" value={isAutheticated.userName} disabled />
          </label>
          <label>
            Departement :{" "}
            <input type="text" value={isAutheticated.department} disabled />
          </label>
          <label>
            Your Contact :
            <input
              type="text"
              placeholder="your phone number to contact you"
              required
            />
          </label>
        </div>

        <div className={c["feedback"]}>
          <label>
            Category :
            <input
              type="text"
              placeholder="please mention a category ..."
              required
            />
          </label>
          <label>
            Description :
            <textarea
              placeholder="Describe the problem in detailes ..."
              required
            />
          </label>
          <label>
            <p>Attach a screen if needed or a screenshot :</p>
          </label>
          <input type="file" required />
        </div>
        <button type="submit">Submit FeedBack </button>
      </form>
    </div>
  );
};

export default FeedBack;
