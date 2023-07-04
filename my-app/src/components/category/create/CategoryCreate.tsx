import {Link} from "react-router-dom";
import {ICategoryCreate} from "./types";
import {useNavigate} from "react-router-dom";
import {useFormik} from "formik";
import axios from "axios";
import defaultImage from "../../../assets/default.jpg"
import { ChangeEvent } from "react";
import http_common from "../../../http_common";
import { ICategoryItem } from "../list/types";


const CategoryCreatePage = () => {
    const navigate = useNavigate();

    const init: ICategoryCreate = {
        name: "",
        image: null,
        description: ""
    };

    const onFormikSubmit = async (values: ICategoryCreate) => {
        //console.log("Send Formik Data", values);
        try {

            const result = await http_common.post(`api/category`, values, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            
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
    const {values, handleChange, handleSubmit,setFieldValue } = formik;

    const onChangeFileHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if(files)
        {
            const file = files[0];
            if(file) {
                const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
                if (!allowedTypes.includes(file.type)) {
                    alert("Не допустимий тип файлу");
                    return;
                }
                setFieldValue(e.target.name, file);
            }
        }
    }


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
                <label htmlFor="image">
                <img src={values.image==null ? defaultImage: URL.createObjectURL(values.image)}
                                 alt="фото"
                                 width={200}
                                 style={{cursor: "pointer"}}/></label>

                    <input type="file" id="image"
                           className="d-none"
                           onChange={onChangeFileHandler}
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