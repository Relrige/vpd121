import {IProductDetailsItem} from "./types";
import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import http_common from "../../../http_common";
import {IPictureDetailsItem} from "./types_picture";
const ProductDetailsPage = () =>
{
    const {id} = useParams();
    const [pictures, setPictures] = useState<IPictureDetailsItem[]>([]);
    const [product, setProduct] = useState<IProductDetailsItem>({
        name: 'Unknown',
        id: 0,
        category_id: 0,
        description: 'Unknown',
        price: 1,
    });
    const navigate = useNavigate();
    useEffect(() => {
        http_common.get<IProductDetailsItem>(`api/product/${id}`).then((resp) => {
            const { data } = resp;
            setProduct(data);
        });
        http_common.get<IPictureDetailsItem[]>(`api/product_images`).then((resp) => {
            const { data } = resp;
            setPictures(data);
        });
    }, []);

    function getPictures(ProductId : number) {
        const array = pictures.filter((pict) => pict.product_id === ProductId);
        return array;
    }

    const picturesListMap = getPictures(product.id).map(item => {
        return (
            <>
                <div className="carousel-item active">
                    <img className="d-block w-100" src={item.name} alt="Картинка відсутня"/>
                </div>
            </>
        )
    });
    async function deleteClick() {
        try {
            const picturesDeleteList = getPictures(product.id);
            for (let i = 0; i < picturesDeleteList.length; i++) {
                if (picturesDeleteList[i] !== undefined) {
                    await http_common.delete<IPictureDetailsItem>(`api/product_images/${picturesDeleteList[i].id}`);
                }
            }
            const result = await http_common.delete<IProductDetailsItem>(`api/product/${id}`);
            console.log("Delete product is good!", result);
            navigate("/");
        } catch {
            console.log("Delete product error!");
        }
    }

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
                <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <h6 className="card-title">Продукт ID: {product.id}</h6>
                    <p>Price: <span className="badge bg-primary">{product.price}$</span></p>
                    <p>{product.description}</p>
                    <Link to={`/product/edit/${id}`} className="btn btn-success">Редагувати</Link>
                    <Link to={`/product/addPicture/${id}`} className="btn btn-primary ms-1">Додати фотографії</Link>
                    <button onClick={deleteClick} className="btn btn-danger ms-1">Видалити</button>
                </div>
                <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0"
                                className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"
                                aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"
                                aria-label="Slide 3"></button>
                    </div>
                    <div className="carousel-inner">
                        {picturesListMap}
                    </div>
                    <button className="carousel-control-prev" type="button"
                            data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Назад</span>
                    </button>
                    <button className="carousel-control-next" type="button"
                            data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Вперед</span>
                    </button>
                </div>
            </div>
        </>
    );
};
export default ProductDetailsPage;