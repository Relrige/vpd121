<?php
$name="";
$email="";
$image="";
$password="";

if($_SERVER['REQUEST_METHOD']=="POST") {
    if(isset($_POST['name']))
        $name=$_POST['name'];
    if(isset($_POST['email']))
        $email=$_POST['email'];
    if(isset($_POST['image']))
        $image=$_POST['image'];
    if(isset($_POST['password']))
        $password=$_POST['password'];
    if(!empty($name)&&!empty($image)&&!empty($email)&&!empty($password)) {
        include $_SERVER["DOCUMENT_ROOT"] . '/connection_dabase.php';
        $sql = "INSERT INTO users(name, email, image, password) VALUES(?, ?, ?, ?);";
        if(isset($dbh)) {
            $stmt = $dbh->prepare($sql);
            $stmt->execute([$name, $email, $image, $password]);
            header('Location: /');
            exit;
        }
    }
}
?>




<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="/css/bootstrap.min.css">
    <link rel="stylesheet" href="/css/site.css">
</head>
<body>
<?php include $_SERVER["DOCUMENT_ROOT"]."/navbar.php";?>
<?php include $_SERVER["DOCUMENT_ROOT"]."/connection_dabase.php";?>
<h1 class="text-center">Додати користувача</h1>

<div class="container">
    <form class="col-md-8 offset-md-2" method="post">
        <div class="mb-3">
            <label for="name" class="form-label">Ім'я</label>
            <input type="text" class="form-control" id="name" name="name" value="<?php echo $name ?>">
        </div>
        <div class="mb-3">
            <label for="email" class="form-label">Електронна пошта</label>
            <input type="text" class="form-control" id="email" name="email" value="<?php echo $email ?>">
        </div>
        <div class="mb-3">
            <label for="image" class="form-label">Шлях до фото</label>
            <input type="text" class="form-control" id="image" name="image" value="<?php echo $image ?>">
        </div>
        <div class="mb-3">
            <label for="password" class="form-label">Пароль</label>
            <input type="password" class="form-control" id="password" name="password" value="<?php echo $password ?>">
        </div>
        <button type="submit" class="btn btn-primary">Додати</button>
    </form>

</div>


<script src="/js/bootstrap.bundle.min.js"></script>
</body>
</html>