<?php
	$to = "";
	$subject = "Заявка с сайта: ";
	$user_name = htmlspecialchars($_POST['name']);
	$user_phone = htmlspecialchars($_POST['phone']);
	$user_mail = htmlspecialchars($_POST['mail']);
    $user_message = htmlspecialchars($_POST['message']);

	// $ip = $_SERVER['REMOTE_ADDR'];
    // $myApiKey = '';
	// $ip_result = (array)json_decode(file_get_contents("https://ip-location.icu/api/v1/city/?apiKey={$myApiKey}&ip={$ip}"));
	// $user_ip = "Область: " .$ip_result['region_name']. "; Город: " .$ip_result['city_name'];
	// $_POST['user_ip'] = $user_ip;


	$form_name = htmlspecialchars($_POST['form_name']);
    $user_client = htmlspecialchars($_POST['user_client']);
	$href = htmlspecialchars($_POST['href']);
	$search = htmlspecialchars($_POST['search']);
	$utm_source = htmlspecialchars($_POST['source']);
	$ref =  htmlspecialchars($_POST['ref']);
	$url =  htmlspecialchars($_POST['url']);
	$medium =  htmlspecialchars($_POST['medium']);
	$campaign =  htmlspecialchars($_POST['campaign']);
	$content =  htmlspecialchars($_POST['content']);
	$utm_term =  htmlspecialchars($_POST['term']);

	$legal_entity =  htmlspecialchars($_POST['legal_entity']);



	$message ="
	<!DOCTYPE html>
		<head>
			<meta http-equiv='Content-Type' content='text/html;charset=UTF-8'/>
			<title></title>
		</head>
		<body style='background-color: #ffffff; color: #000000; font-style: normal; font-variant: normal; font-weight: normal; font-size: 12px; line-height: 18px; font-family: helvetica, arial, verdana, sans-serif;'>
		<h2 style='background-color: #eeeeee;'>Заявка с лендинга: exportclub.com.by</h2>
			<table cellspacing='0' cellpadding='0' width='80%' style='background-color: #ffffff;'>
				<tbody>
					<tr>
						<td style='width: 340px; padding-top:5px;'><b>Тема:</b></td>
						<td>$form_name</td>
					</tr>
					<tr>
						<td style='width: 340px; padding-top:5px;'><b>Имя:</b></td>
						<td>$user_name</td>
					</tr>
					<tr>
						<td style='width: 340px; padding-top:5px;'><b>Телефон:</b></td>
						<td>$user_phone</td>
					</tr>
					<tr>
						<td style='width: 340px; padding-top:5px;'><b>Юр. лицо:</b></td>
						<td>$legal_entity</td>
					</tr>
					<tr>
						<td style='width: 340px; padding-top:5px;'><b>Почта:</b></td>
						<td>$user_mail</td>
					</tr>
					<tr>
						<td style='width: 340px; padding-top:5px;'><b>Сообщение:</b></td>
						<td>$user_message</td>
					</tr>
					<tr>
						<td style='width: 340px; padding-top:5px;'><b>URL:</b></td>
						<td>$href</td>
					</tr>
					<tr>
						<td style='width: 340px; padding-top:5px;'><b>Referrer (источник перехода):</b></td>
						<td>$ref</td>
					</tr>
					<tr>
						<td style='width: 340px; padding-top:5px;'><b>Source: (источник кампании)</b></td>
						<td>$utm_source</td>
					</tr>
					<tr>
						<td style='width: 340px; padding-top:5px;'><b>Medium: (тип трафика)</b></td>
						<td>$medium</td>
					</tr>
					<tr>
						<td style='width: 340px; padding-top:5px;'><b>Campaign: (название кампании)</b></td>
						<td>$campaign</td>
					</tr>
					<tr>
						<td style='width: 340px; padding-top:5px;'><b>Content: (идентифик. объявления)</b></td>
						<td>$content</td>
					</tr>
					<tr>
						<td style='width: 340px; padding-top:5px;'><b>Term: (ключевые слова)</b></td>
						<td>$utm_term</td>
					</tr>
					<tr>
						<td style='width: 340px; padding-top:5px;'><b>Клиент пользователя:</b></td>
						<td>$user_client</td>
					</tr>
					<tr>
						<td style='width: 340px; padding-top:5px;'><b>IP Адрес:</b></td>
						<td>$ip</td>
					</tr>
					<tr>
						<td style='width: 340px; padding-top:5px;'><b>Местонахождение клиента:</b></td>
						<td>$user_ip</td>
					</tr>
				</tbody>
			</table>
		</body>
	</html>
	";
	$header = "From:  <> \r\nContent-type: text/html; charset=UTF-8 \r\n";
	mail($to, $subject, $message, $header);
	echo "Заявка принята";
	exit();

	?>
