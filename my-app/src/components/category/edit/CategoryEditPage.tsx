import {ICategoryEdit} from "./types";
import {useNavigate, useParams} from "react-router-dom";
import {useFormik} from "formik";
import axios from "axios";
import http_common from "../../../http_common";
import {ChangeEvent, useEffect, useState} from "react";
import {ICategoryItem} from "../list/types";
import defaultImage from '../../../assets/default.jpg';
import {APP_ENV} from "../../../env";


const CategoryEditPage = () => {

    const navigate = useNavigate();
    const {id} = useParams();
    const [oldImage, setOldImage] = useState<string>("");

    // Ініціалізуємо початкові значення форми редагування категорії
    const init: ICategoryEdit = {
        id: id ? Number(id) : 0,
        name: "",
        image: null,
        description: ""
    };

    const onFormikSubmit = async (values: ICategoryEdit) => {
        try {
            // Відправляємо дані форми на сервер
            const result = await http_common.post(`api/category/edit/${id}`, values, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            // Перенаправляємо користувача після успішного оновлення категорії
            navigate("../..");
        } catch {
            console.log("Server error");
        }
    }

    const formik = useFormik({
        initialValues: init,
        onSubmit: onFormikSubmit
    });

    const {values, handleChange, handleSubmit, setFieldValue} = formik;

    useEffect(() => {
        // Отримуємо дані про категорію з сервера за допомогою її ідентифікатора (id)
        http_common.get<ICategoryItem>(`api/category/${id}`)
            .then(resp => {
                const {data} = resp;

                // Встановлюємо отримані значення у відповідні поля форми
                setFieldValue("name", data.name);
                setOldImage(`${APP_ENV.BASE_URL}/uploads/300_${data.image}`);
                setFieldValue("description", data.description);
            });
    },[id]);

    const onChangeFileHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if(files)
        {
            const file = files[0];
            if(file) {
                // Перевірка типу обраного файлу - допустимі типи: jpeg, png, gif
                const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
                if (!allowedTypes.includes(file.type)) {
                    alert("Не допустимий тип файлу");
                    return;
                }
                setFieldValue(e.target.name, file);
            }
        }
    }

    const imgView = oldImage ? oldImage : defaultImage;

    return (
        <>
            <h1 className="text-center">Змінить категорію</h1>
            <div className="container">
                <form className="col-md-8 offset-md-2" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Назва</label>
                        <input type="text" className="form-control" id="name"
                               value={values.name}
                               onChange={handleChange}
                               name="name"/>
                               
                               // Це поле вводу для назви категорії. Значення поля зберігається в values.name, і при його зміні викликається функція handleChange.
                    </div>

                    <div className="mb-3">
                        <label htmlFor="image" className="form-label">
                            //Це зображення, яке відображається у формі. Якщо значення values.image є нульовим (тобто зображення не вибране), тоді використовується imgView - посилання на старе зображення.
                            <img src={values.image==null ? imgView : URL.createObjectURL(values.image)}
                                 alt="фото"
                                 width={200}
                                 style={{cursor: "pointer"}}/>
                            <span className={"btn btn-danger"}>Змінить фото</span>
                        </label>
                        // Це поле вводу файлу для вибору зображення. При зміні файлу викликається функція onChangeFileHandler.
                        <input type="file" className="form-control d-none" id="image"
                               onChange={onChangeFileHandler}
                               name="image"/>
                               
                               
                    </div>

                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Опис</label>
                        //Це поле вводу для опису категорії. Значення поля зберігається в values.description, і при його зміні викликається функція handleChange.
                        <input type="text" className="form-control" id="description"
                               value={values.description}
                               onChange={handleChange}
                               name="description"/>
                    </div>

                    <button type="submit" className="btn btn-primary">Зберегти</button> //Це кнопка "Зберегти", яка виконується під час натискання. При натисканні виконується функція handleSubmit, яка обробляє дані форми.
                </form>
            </div>
        </>
    );
}

export default CategoryEditPage;
