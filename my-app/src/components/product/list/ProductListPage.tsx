import React, {useEffect, useState} from "react";
import './ProductListPage.css';
import {IProductItem} from "./types";
import http_common from "../../../http_common";
import {Link} from "react-router-dom";
import {ICategoryItem} from "../../category/list/types";
import {IPictureItem} from "./types_photo";
const ProductListPage = () =>
{
    const [products, setList] = useState<IProductItem[]>([]);
    const [categories, setCategories] = useState<ICategoryItem[]>([]);
    const [pictures, setPictures] = useState<IPictureItem[]>([]);
    useEffect(() => {
        http_common.get<IProductItem[]>("api/product")
            .then(resp => {
                const {data} = resp;
                setList(data);
            });

        http_common.get<ICategoryItem[]>("api/category").then((resp) => {
            const { data } = resp;
            setCategories(data);
        });

        http_common.get<IPictureItem[]>("api/product_images")
            .then(resp => {
                const { data } = resp;
                setPictures(data);
            });
    }, []);

    const getCategoryName = (categoryId: number) => {
        const category = categories.find((cat) => cat.id === categoryId);
        return category ? category.name : "";
    };

    const getPricture = (ProductId: number) => {
        const picture = pictures.find((pict) => pict.product_id === ProductId && pict.priority === 1);
        return picture ? picture.name : "";
    };

    const listMap = products.map(item => {
        return (
            <>
                <img className="card-img-top" src={getPricture(item.id)} alt="Відсутня"/>
                <div className="card-body text-center">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">{getCategoryName(item.category_id)}{" "}<span className="badge bg-primary">{item.price}$</span></p>
                    <Link className="btn btn-outline-success" to={`product/details/${item.id}`}>Деталі</Link>
                </div>
            </>
        )
    });


    return (
        <>
            <div className="head">
                <div className="text-center">
                    <h1 className="display-4">Товари</h1>
                    <Link className="btn btn-primary" to={`/product/create`}>Додати</Link>
                </div>
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    <div className="col">
                        <div className="card h-100 container-products">
                            {listMap}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};
export default ProductListPage;