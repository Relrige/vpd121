import {Link} from "react-router-dom";
import {ICategoryCreate} from "./types";
import {useNavigate} from "react-router-dom";
import {useFormik} from "formik";
import axios from "axios";
const CategoryCreatePage = () => {
    const navigate = useNavigate();

    const init: ICategoryCreate = {
        name: "",
        image: "",
        description: ""
    };

    const onFormikSubmit = async (values: ICategoryCreate) => {
        //console.log("Send Formik Data", values);
        try {
            const result = await axios.post("http://laravel.vpd121.com/api/category", values);
            navigate("/");
        }
        catch {
            console.log("Server error");
        }
    }

    const formik = useFormik({
        onSubmit: onFormikSubmit,
        initialValues: init
    });

    const {values, handleChange, handleSubmit } = formik;

    return (
        <>
            <Link to="/" className="btn btn-success">Back</Link>
            <h1 className={"text-center"}>Додати категорію</h1>
            <form className={"col-md-8 offset-md-2"} onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Назва</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name={"name"}
                        value={values.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="image" className="form-label">Фото</label>
                    <input type="text" className="form-control" id="image"
                           value={values.image}
                           onChange={handleChange}
                           name="image"/>
                </div>

                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Опис</label>
                    <input type="text" className="form-control" id="description"
                           value={values.description}
                           onChange={handleChange}
                           name="description"/>
                </div>
                <button type="submit" className="btn btn-primary">Додати</button></form>
        </>
    );
}
export default CategoryCreatePage;