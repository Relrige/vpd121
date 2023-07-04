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
    if (isset($_FILES['image'])) {
        $file = $_FILES['image'];
        $image = uploadFile($file);
    }
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
function uploadFile($file)
{
    $targetDirectory = "uploads/";
    $targetFile = $targetDirectory . basename($file["name"]);
    $uploadOk = 1;
    $imageFileType = strtolower(pathinfo($targetFile, PATHINFO_EXTENSION));

    // Check if image file is a actual image or fake image
    $check = getimagesize($file["tmp_name"]);
    if ($check !== false) {
        $uploadOk = 1;
    } else {
        echo "File is not an image.";
        $uploadOk = 0;
    }


    // Allow certain file formats
    if ($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
        && $imageFileType != "gif"
    ) {
        echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
        $uploadOk = 0;
    }

    // Check if $uploadOk is set to 0 by an error
    if ($uploadOk == 0) {
        echo "Sorry, your file was not uploaded.";
        return "";
    } else {
        if (move_uploaded_file($file["tmp_name"], $targetFile)) {
            return $targetFile;
        } else {
            echo "Sorry, there was an error uploading your file.";
            return "";
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
    <form class="col-md-8 offset-md-2" method="post" enctype="multipart/form-data">
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
            <input type="file" class="form-control" id="image" name="image" value="<?php echo $image ?>">
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