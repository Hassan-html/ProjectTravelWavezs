import nodemailer from "nodemailer";
import User from "@/app/api/models/userModel";
import bcryptjs from "bcryptjs";

const transporter = nodemailer.createTransport({
  host: "mail.travelwavez.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.mailUser,
    pass: process.env.mailPass,
  },
});

export const sendEmail = async (email, userId, emailType) => {
  function preprocessToken(password) {
    // Remove non-alphabetic characters from the password
    const processedToken = password.replace(/[^a-zA-Z]/g, "");
    return processedToken;
  }
  try {
    console.log(userId);
    const Token = await bcryptjs.hash(userId.toString(), 10);
    const hashedToken = preprocessToken(Token);
    const today = new Date();
    const expirey = new Date();
    expirey.setDate(today.getDate() + 1);
    if (emailType === "verify") {
      console.log("mail type verify: " + hashedToken);

      const user = await User.findByIdAndUpdate(
        userId,
        { verifyToken: hashedToken, verifyTokenExpirey: expirey },
        { new: true, runValidators: true }
      );
      user.save();
    } else if (emailType === "reset") {
      console.log("mail type reset: ", hashedToken);
      const user = await User.findByIdAndUpdate(
        userId,
        {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpire: expirey,
        },
        { new: true, runValidators: true }
      );
      user.save();
    }

    const mailOptions = {
      from: "info@travelwavez.com",
      to: email,
      subject:
        emailType == "verify" ? "Verify Your email" : "Reset Your password",
      html: `
     <!--
* This email was built using Tabular.
* For more information, visit https://tabular.email
-->
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
<head>
<title></title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<!--[if !mso]><!-->
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<!--<![endif]-->
<meta name="x-apple-disable-message-reformatting" content="" />
<meta content="target-densitydpi=device-dpi" name="viewport" />
<meta content="true" name="HandheldFriendly" />
<meta content="width=device-width" name="viewport" />
<meta name="format-detection" content="telephone=no, date=no, address=no, email=no, url=no" />
<style type="text/css">
table {
border-collapse: separate;
table-layout: fixed;
mso-table-lspace: 0pt;
mso-table-rspace: 0pt
}
table td {
border-collapse: collapse
}
.ExternalClass {
width: 100%
}
.ExternalClass,
.ExternalClass p,
.ExternalClass span,
.ExternalClass font,
.ExternalClass td,
.ExternalClass div {
line-height: 100%
}
body, a, li, p, h1, h2, h3 {
-ms-text-size-adjust: 100%;
-webkit-text-size-adjust: 100%;
}
html {
-webkit-text-size-adjust: none !important
}
body, #innerTable {
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale
}
#innerTable img+div {
display: none;
display: none !important
}
img {
Margin: 0;
padding: 0;
-ms-interpolation-mode: bicubic
}
h1, h2, h3, p, a {
line-height: 1;
overflow-wrap: normal;
white-space: normal;
word-break: break-word
}
a {
text-decoration: none
}
h1, h2, h3, p {
min-width: 100%!important;
width: 100%!important;
max-width: 100%!important;
display: inline-block!important;
border: 0;
padding: 0;
margin: 0
}
a[x-apple-data-detectors] {
color: inherit !important;
text-decoration: none !important;
font-size: inherit !important;
font-family: inherit !important;
font-weight: inherit !important;
line-height: inherit !important
}
a[href^="mailto"],
a[href^="tel"],
a[href^="sms"] {
color: inherit;
text-decoration: none
}
img,p{margin:0;Margin:0;font-family:Fira Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:21px;font-weight:400;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#555;text-align:center;mso-line-height-rule:exactly;mso-text-raise:2px}h1{margin:0;Margin:0;font-family:Roboto,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:34px;font-weight:400;font-style:normal;font-size:28px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}h2{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:30px;font-weight:400;font-style:normal;font-size:24px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}h3{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:26px;font-weight:400;font-style:normal;font-size:20px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}
</style>
<style type="text/css">
@media (min-width: 481px) {
.hd { display: none!important }
}
</style>
<style type="text/css">
@media (max-width: 480px) {
.hm { display: none!important }
}
</style>
<style type="text/css">
@media (min-width: 481px) {
h1,img,p{margin:0;Margin:0}img,p{font-family:Fira Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:21px;font-weight:400;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#555;text-align:center;mso-line-height-rule:exactly;mso-text-raise:2px}h1{font-family:Roboto,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:34px;font-weight:400;font-style:normal;font-size:28px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}h2,h3{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;font-weight:400;font-style:normal;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}h2{line-height:30px;font-size:24px}h3{line-height:26px;font-size:20px}.t8{width:720px!important}.t24{padding:40px 60px 50px!important;width:680px!important}.t11,.t22,.t30,.t34{width:600px!important}.t17{width:580px!important}.t36{padding-left:0!important;padding-right:0!important;width:400px!important}
}
</style>
<style type="text/css">
[style*="Inter Tight"] {font-family: 'Inter Tight', BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif !important;} [style*="Albert Sans"] {font-family: 'Albert Sans', BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif !important;}
</style>
<style type="text/css" media="screen and (min-width:481px)">.moz-text-html img,.moz-text-html p{margin:0;Margin:0;font-family:Fira Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:21px;font-weight:400;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#555;text-align:center;mso-line-height-rule:exactly;mso-text-raise:2px}.moz-text-html h1{margin:0;Margin:0;font-family:Roboto,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:34px;font-weight:400;font-style:normal;font-size:28px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}.moz-text-html h2{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:30px;font-weight:400;font-style:normal;font-size:24px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}.moz-text-html h3{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:26px;font-weight:400;font-style:normal;font-size:20px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}.moz-text-html .t8{width:720px!important}.moz-text-html .t24{padding:40px 60px 50px!important;width:680px!important}.moz-text-html .t11{width:600px!important}.moz-text-html .t17{width:580px!important}.moz-text-html .t22{width:600px!important}.moz-text-html .t36{padding-left:0!important;padding-right:0!important;width:400px!important}.moz-text-html .t30,.moz-text-html .t34{width:600px!important}</style>
<!--[if !mso]><!-->
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;600;700&amp;family=Albert+Sans:wght@800&amp;display=swap" rel="stylesheet" type="text/css" />
<!--<![endif]-->
<!--[if mso]>
<style type="text/css">
img,p{margin:0;Margin:0;font-family:Fira Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:21px;font-weight:400;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#555;text-align:center;mso-line-height-rule:exactly;mso-text-raise:2px}h1{margin:0;Margin:0;font-family:Roboto,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:34px;font-weight:400;font-style:normal;font-size:28px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}h2{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:30px;font-weight:400;font-style:normal;font-size:24px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}h3{margin:0;Margin:0;font-family:Lato,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:26px;font-weight:400;font-style:normal;font-size:20px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}td.t8{width:800px !important}td.t24{padding:40px 60px 50px !important;width:800px !important}td.t11,td.t17,td.t22{width:600px !important}td.t36{padding-left:0 !important;padding-right:0 !important}td.t30,td.t34{width:600px !important}
</style>
<![endif]-->
<!--[if mso]>
<xml>
<o:OfficeDocumentSettings>
<o:AllowPNG/>
<o:PixelsPerInch>96</o:PixelsPerInch>
</o:OfficeDocumentSettings>
</xml>
<![endif]-->
</head>
<body class="t41" style="min-width:100%;Margin:0px;padding:0px;background-color:#05445E;"><div class="t40" style="background-color:#05445E;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" align="center"><tr><td class="t39" style="font-size:0;line-height:0;mso-line-height-rule:exactly;background-color:#05445E;" valign="top" align="center">
<!--[if mso]>
<v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false">
<v:fill color="#05445E"/>
</v:background>
<![endif]-->
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" align="center" id="innerTable"><tr><td>
<table class="t4" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
<!--[if !mso]><!--><td class="t3" style="width:320px;padding:40px 40px 40px 40px;">
<!--<![endif]-->
<!--[if mso]><td class="t3" style="width:400px;padding:40px 40px 40px 40px;"><![endif]-->
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td>
<table class="t2" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
<!--[if !mso]><!--><td class="t1" style="width:55px;">
<!--<![endif]-->
<!--[if mso]><td class="t1" style="width:55px;"><![endif]-->
<div style="font-size:0px;"><img class="t0" style="display:block;border:0;height:auto;width:100%;Margin:0;max-width:100%;" width="55" height="36.4375" alt="" src="https://358794bd-5827-4d89-a21a-3a539c02c19a.b-cdn.net/e/0c3ef44a-c1f4-47c9-85d8-7efb164d3fc9/913c6703-34e5-4dc2-8952-c927ace5cde9.png"/></div></td>
</tr></table>
</td></tr></table></td>
</tr></table>
</td></tr><tr><td>
<table class="t27" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
<!--[if !mso]><!--><td class="t26" style="background-color:#FFFFFF;width:400px;">
<!--<![endif]-->
<!--[if mso]><td class="t26" style="background-color:#FFFFFF;width:400px;"><![endif]-->
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td>
<table class="t9" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
<!--[if !mso]><!--><td class="t8" style="background-color:#189ab4;width:400px;padding:40px 40px 40px 40px;">
<!--<![endif]-->
<!--[if mso]><td class="t8" style="background-color:#189ab4;width:480px;padding:40px 40px 40px 40px;"><![endif]-->
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td>
<table class="t7" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
<!--[if !mso]><!--><td class="t6" style="width:200px;">
<!--<![endif]-->
<!--[if mso]><td class="t6" style="width:200px;"><![endif]-->
<div style="font-size:0px;"><img class="t5" style="display:block;border:0;height:auto;width:100%;Margin:0;max-width:100%;" width="200" height="200" alt="" src="https://358794bd-5827-4d89-a21a-3a539c02c19a.b-cdn.net/e/0c3ef44a-c1f4-47c9-85d8-7efb164d3fc9/8e725fb6-ebdb-4832-bf38-13ba530da9c2.png"/></div></td>
</tr></table>
</td></tr></table></td>
</tr></table>
</td></tr><tr><td>
<table class="t25" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
<!--[if !mso]><!--><td class="t24" style="width:420px;padding:30px 30px 40px 30px;">
<!--<![endif]-->
<!--[if mso]><td class="t24" style="width:480px;padding:30px 30px 40px 30px;"><![endif]-->
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td>
<table class="t12" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
<!--[if !mso]><!--><td class="t11" style="width:480px;">
<!--<![endif]-->
<!--[if mso]><td class="t11" style="width:480px;"><![endif]-->
<h1 class="t10" style="margin:0;Margin:0;font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Albert Sans';line-height:35px;font-weight:800;font-style:normal;font-size:30px;text-decoration:none;text-transform:none;letter-spacing:-1.2px;direction:ltr;color:#333333;text-align:center;mso-line-height-rule:exactly;mso-text-raise:2px;">${
        emailType == "verify" ? "Verify Your Email" : "Reset Your Password"
      }</h1></td>
</tr></table>
</td></tr><tr><td><div class="t13" style="mso-line-height-rule:exactly;mso-line-height-alt:16px;line-height:16px;font-size:1px;display:block;">&nbsp;</div></td></tr><tr><td><p class="t14" style="margin:0;Margin:0;font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Inter Tight';line-height:21px;font-weight:400;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;direction:ltr;color:#555555;text-align:center;mso-line-height-rule:exactly;mso-text-raise:2px;">
${
  emailType == "verify"
    ? "You are one step away, Click on button below to verify your email or copy and pastet this link in your browser"
    : "Click on the lInk below to Reset your Password"
}
<br>${process.env.DOMAIN}/pages/public/auth/${
        emailType == "verify" ? "verify" : "resetPass"
      }?token=${hashedToken}
</p></td></tr><tr><td><div class="t15" style="mso-line-height-rule:exactly;mso-line-height-alt:30px;line-height:30px;font-size:1px;display:block;">&nbsp;</div></td></tr><tr><td>
<table class="t18" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
<!--[if !mso]><!--><td class="t17" style="background-color:#189ab4;overflow:hidden;width:460px;text-align:center;line-height:24px;mso-line-height-rule:exactly;mso-text-raise:2px;padding:10px 10px 10px 10px;border-radius:10px 10px 10px 10px;">
<!--<![endif]-->
<!--[if mso]><td class="t17" style="background-color:#189ab4;overflow:hidden;width:480px;text-align:center;line-height:24px;mso-line-height-rule:exactly;mso-text-raise:2px;padding:10px 10px 10px 10px;border-radius:10px 10px 10px 10px;"><![endif]-->
<a href="${process.env.DOMAIN}/pages/public/auth/${
        emailType == "verify" ? "verify" : "resetPass"
      }?token=${hashedToken}">

<span class="t16" style="display:block;margin:0;Margin:0;font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Inter Tight';line-height:24px;font-weight:600;font-style:normal;font-size:16px;text-decoration:none;direction:ltr;color:#FFFFFF;text-align:center;mso-line-height-rule:exactly;mso-text-raise:2px;">${
        emailType == "verify" ? "Verify Email" : "Reset Password"
      }</span>
</a>
</td>
</tr></table>
</td></tr><tr><td><div class="t21" style="mso-line-height-rule:exactly;mso-line-height-alt:12px;line-height:12px;font-size:1px;display:block;">&nbsp;</div></td></tr><tr><td>
<table class="t23" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
<!--[if !mso]><!--><td class="t22" style="width:480px;">
<!--<![endif]-->
<!--[if mso]><td class="t22" style="width:480px;"><![endif]-->
<p class="t20" style="margin:0;Margin:0;font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Inter Tight';line-height:21px;font-weight:400;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;direction:ltr;color:#555555;text-align:center;mso-line-height-rule:exactly;mso-text-raise:2px;">or <a class="t19" href="${
        process.env.DOMAIN
      }/pages/public/auth/login" style="margin:0;Margin:0;font-weight:700;font-style:normal;text-decoration:none;direction:ltr;color:#000000;mso-line-height-rule:exactly;" target="_blank">log in</a> to your account</p></td>
</tr></table>
</td></tr></table></td>
</tr></table>
</td></tr></table></td>
</tr></table>
</td></tr><tr><td><div class="t28" style="mso-line-height-rule:exactly;mso-line-height-alt:30px;line-height:30px;font-size:1px;display:block;">&nbsp;</div></td></tr><tr><td>
<table class="t37" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
<!--[if !mso]><!--><td class="t36" style="width:320px;padding:0 40px 0 40px;">
<!--<![endif]-->
<!--[if mso]><td class="t36" style="width:400px;padding:0 40px 0 40px;"><![endif]-->
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td>
<table class="t31" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
<!--[if !mso]><!--><td class="t30" style="width:480px;">
<!--<![endif]-->
<!--[if mso]><td class="t30" style="width:480px;"><![endif]-->
<p class="t29" style="margin:0;Margin:0;font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Inter Tight';line-height:18px;font-weight:400;font-style:normal;font-size:12px;text-decoration:none;text-transform:none;direction:ltr;color:#555555;text-align:center;mso-line-height-rule:exactly;mso-text-raise:2px;"></p></td>
</tr></table>
</td></tr><tr><td><div class="t33" style="mso-line-height-rule:exactly;mso-line-height-alt:8px;line-height:8px;font-size:1px;display:block;">&nbsp;</div></td></tr><tr><td>
<table class="t35" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
<!--[if !mso]><!--><td class="t34" style="width:480px;">
<!--<![endif]-->
<!--[if mso]><td class="t34" style="width:480px;"><![endif]-->
<p class="t32" style="margin:0;Margin:0;font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Inter Tight';line-height:18px;font-weight:400;font-style:normal;font-size:12px;text-decoration:none;text-transform:none;direction:ltr;color:#555555;text-align:center;mso-line-height-rule:exactly;mso-text-raise:2px;">HSN-Codes Inc. All rights reserved</p></td>
</tr></table>
</td></tr></table></td>
</tr></table>
</td></tr><tr><td><div class="t38" style="mso-line-height-rule:exactly;mso-line-height-alt:100px;line-height:100px;font-size:1px;display:block;">&nbsp;</div></td></tr></table></td></tr></table></div></body>
</html>
   
        

    `,
    };

    const mailresponse = await transporter.sendMail(mailOptions);

    console.log(mailresponse);
  } catch (error) {
    throw new Error(error.message);
  }
};
