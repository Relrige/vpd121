import {IProductEditItem} from "./types";
import {useFormik} from "formik";
import {Link, useNavigate, useParams} from "react-router-dom";
import http_common from "../../../http_common";

const ProductEditPage = () => {
    const {id} = useParams();
    const init : IProductEditItem = {
        id: 0,
        name: "",
        price: 1,
        description: "",
        category_id: 0
    };

    const navigate = useNavigate();
    const onFormikSubmit = async (values: IProductEditItem) => {
        try {
            await http_common.post(`api/product/edit/${id}`, values);
            navigate(`/product/details/${id}`);
        } catch (error) {
            console.log(error);
        }
    }

    const formik = useFormik({
        onSubmit: onFormikSubmit,
        initialValues: init
    });
    const {values, handleChange, handleSubmit} = formik;
    values.id = parseInt(id || "");

    return (
        <>
            <div className="card text-center">
                <div className="card-header">
                    <ul className="nav nav-pills card-header-pills containerul">
                        <li className="nav-item">
                            <Link to={`/`} className="nav-link bg-dark active">Назад</Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="container">
                <h1 className="text-center">Зміна Продукту</h1>
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
                        <label htmlFor="description" className="form-label">Опис</label>
                        <input
                            type="text"
                            className="form-control"
                            id="description"
                            name={"description"}
                            value={values.description}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Ціна</label>
                        <input
                            type="number"
                            className="form-control"
                            id="price"
                            name={"price"}
                            value={values.price}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="category_id" className="form-label">Категорія ID</label>
                        <input
                            type="number"
                            className="form-control"
                            id="category_id"
                            name={"category_id"}
                            value={values.category_id}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Зберегти</button>
                </form>
            </div>
        </>
    );
}

export default ProductEditPage;