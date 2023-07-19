import {IProductCreateItem} from "./types";
import {useFormik} from "formik";
import http_common from "../../../http_common";
import {Link, useNavigate} from "react-router-dom";
import React from "react";

const ProductCreatePage = () => {
    const init : IProductCreateItem = {
        name: "",
        price: 1,
        category_id: 0,
        description: ""
    };

    const navigate = useNavigate();

    const onFormikSubmit = async (values: IProductCreateItem) => {
        try {
            const result =  await http_common.post<IProductCreateItem>("api/product", values);
            console.log("Add product is good!", result.data);
            navigate("/");
        }
        catch {
            console.log("Add product error!");
        }
    }

    const formik = useFormik({
        onSubmit: onFormikSubmit,
        initialValues: init
    });

    const {values, handleChange, handleSubmit} = formik;

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
                <h1 className="text-center">Додати продукт</h1>
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
                        <label htmlFor="price" className="form-label">Ціна</label>
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
                    <button type="submit" className="btn btn-primary">Додати</button>
                </form>
            </div>
        </>
    )
}

export default ProductCreatePage;