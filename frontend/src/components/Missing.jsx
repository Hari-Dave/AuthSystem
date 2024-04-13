import { Link } from "react-router-dom";

const Missing = () => {
  return (
    <section>
      <h1>Oops!</h1>
      <br />
      <p>Page Not Found</p>
      <div className="flexGrow">
        <Link to="/">Visit Our HomePage</Link>
      </div>
    </section>
  )
}

export default Missing;