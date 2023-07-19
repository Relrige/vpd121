import {IAddPictureItem} from "./types";
import {useFormik} from "formik";
import {Link, useNavigate, useParams} from "react-router-dom";
import http_common from "../../../../http_common";
import React, {useEffect, useState} from "react";
import {IProductDetailsItem} from "../../details/types";

const AddPicturePage = () => {
    const {id} = useParams();
    const [product, setProduct] = useState<IProductDetailsItem>({
        name: 'Unknown',
        id: 0,
        category_id: 0,
        description: 'Unknown',
        price: 1,
    });
    const init : IAddPictureItem = {
        name: "",
        product_id: 0,
        priority: 5
    };

    useEffect(() => {
        http_common.get<IProductDetailsItem>(`api/product/${id}`).then((resp) => {
            const { data } = resp;
            setProduct(data);
        });
    }, []);

    const navigate = useNavigate();

    const onFormikSubmit = async (values: IAddPictureItem) => {
        try {
            const result =  await http_common.post<IAddPictureItem>("api/product_images", values);
            console.log("Add Picture is good!", result.data);
            navigate(`/product/details/${id}`);
        }
        catch {
            console.log("Add picture error!");
        }
    }

    const formik = useFormik({
        onSubmit: onFormikSubmit,
        initialValues: init
    });

    const {values, handleChange, handleSubmit} = formik;

    values.product_id = product.id;

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
                <h1 className="text-center">Додати Картинку</h1>
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
                        <label htmlFor="priority" className="form-label">Пріоритет</label>
                        <input
                            type="number"
                            className="form-control"
                            id="priority"
                            name={"priority"}
                            value={values.priority}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Додати</button>
                </form>
            </div>
        </>
    )
}

export default AddPicturePage;