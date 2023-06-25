<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css">
    <link rel="stylesheet" href="/css/site.css">
</head>
<body>
    <?php include $_SERVER["DOCUMENT_ROOT"]."/navbar.php";?>
    <?php include $_SERVER["DOCUMENT_ROOT"]."/connection_dabase.php";?>
    <h1 class="text-center">Список користувачів</h1>
    <a href="/create.php" class="btn btn-success">Додати</a>
    <table class="table">
        <thead>
        <tr>
            <th scope="col">#</th>
            <th scope="col">Фото</th>
            <th scope="col">Ім'я</th>
            <th scope="col">Пошта</th>
            <th scope="col">Buttons</th>
        </tr>
        </thead>
        <tbody>
        <?php
        $sql = "SELECT id, name, email, image FROM users;";
        if(isset($dbh)) {
            $command = $dbh->query($sql);
            foreach ($command as $row) {
                $id = $row["id"];
                $name = $row["name"];
                $email = $row["email"];
                $image = $row["image"];

                echo "
                <tr>
                    <th>$id</th>
                    <td><img src='$image' width='50'/></td>
                    <td>$name</td>
                    <td>$email</td>
                     <td>
                            <a href='/edit.php?id=$id' class='text-primary' style='text-decoration: none;'>
                                <i class='bi bi-pencil-square'></i>
                            </a>
                                &nbsp;
                            <a href='/delete.php?id=$id' class='text-danger' data-delete>
                                <i class='bi bi-x'></i>
                            </a>
                        </td>
                </tr>
                ";
            }
        }
        ?>
        </tbody>
    </table>
    <?php include $_SERVER["DOCUMENT_ROOT"] . "/modals/deleteModal.php"; ?>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/1.4.0/axios.min.js" integrity="sha512-uMtXmF28A2Ab/JJO2t/vYhlaa/3ahUOgj1Zf27M5rOo8/+fcTUVH0/E0ll68njmjrLqOBjXM3V9NiPFL5ywWPQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

    <script src="/js/bootstrap.bundle.min.js"></script>
    <script>
        window.addEventListener("load", (event) => {
            let hrefDelete="";
            const delBtns = document.querySelectorAll("[data-delete]");
            const deleteModal = new bootstrap.Modal(document.getElementById("deleteModal"));
            for (i=0;i<delBtns.length; i++) {
                delBtns[i].onclick = function(e) {
                    e.preventDefault();
                    hrefDelete=this.href;
                    deleteModal.show();
                }
            }
            document.getElementById("modalDeleteYes").onclick=function () {
                    axios.post(hrefDelete).then(resp => {
                    deleteModal.hide();
                    location.reload();
                });
            }
        });
    </script>

</body>
</html>