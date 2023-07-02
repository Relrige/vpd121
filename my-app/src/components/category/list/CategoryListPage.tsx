import React, {useEffect, useState} from "react";
import http from "../../../http_common";
import {ICategoryItem} from "./types";
import {Link} from "react-router-dom";
import axios from "axios"
import http_common from "../../../http_common";

const CategoryListPage = () => {
    const [list, setList] = useState<ICategoryItem[]>([]);
    useEffect(()=>{
        http_common.get<ICategoryItem[]>("api/category")
            .then(resp=> {
                const {data}=resp;
                setList(data);
            });
    },[]);


    const handleDelete = (id: number) => {
        http_common
            .delete(`api/category/${id}`)
            .then(() => {
                setList((prevList) => prevList.filter((item) => item.id !== id));
            })
            .catch((error) => {
                console.log("Помилка під час видалення категорії:", error);
            });
    };

    const mapList = list.map(item=>{
        return(
            <tr key={item.id}>
                <th scope="row">{item.id}</th>
                <td>{item.name}</td>
                <td>{item.image}</td>
                <td>{item.description}</td>
                <td>
                    <Link to={`/category/edit/${item.id}`} className={"btn btn-success"}>Змінити</Link>
                <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(item.id)}> Delete </button>
                </td>
            </tr>
        );
    });

    return (
        <>
            <div className="container">
                <h1 className="text-center">Список категорій</h1>
                <Link to="/category/create" className="btn btn-success">Додати</Link>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Назва</th>
                        <th scope="col">Фото</th>
                        <th scope="col">Опис</th>
                        <th></th>

                    </tr>
                    </thead>
                    <tbody>
                        {mapList}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default CategoryListPage;
