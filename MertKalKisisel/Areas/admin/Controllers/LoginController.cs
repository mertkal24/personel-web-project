using MertKalKisisel.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Web;
using System.Web.ModelBinding;
using System.Web.Mvc;
using System.Web.Security;

namespace MertKalKisisel.Areas.admin.Controllers
{
    public class LoginController : Controller
    {
        // GET: admin/Login
        public ActionResult Index()
        {
           
            return View();
        }
       
        public ActionResult ALogin(Adminler AdminTablosu)
        {
            if (!ModelState.IsValid)
            {
                return View("Index", AdminTablosu);
            }
            string sifre = Sifrele.MD5sifrele(AdminTablosu.Sifre);
            using (KalMertModelEntities db = new KalMertModelEntities())
            {
                var adminvarmi = db.Adminler.FirstOrDefault(x => x.AdminKullaniciAdi == AdminTablosu.AdminKullaniciAdi && x.Sifre == sifre);
                if (adminvarmi != null)
                {
                    FormsAuthentication.SetAuthCookie(adminvarmi.Sifre, AdminTablosu.BeniHatirla);
                    return RedirectToAction("/index", "AdminAna");
                }
                ViewBag.Hata = "Kullanıcı Adı Veya Şifre Hatalı";
                return View("Index");
            }

        }
        public ActionResult Logout()
        {
            FormsAuthentication.SignOut();
            return RedirectToAction("Index");

        }    
        public JsonResult ResetJson(string POSTA)
        {

            KalMertModelEntities db = new KalMertModelEntities();
            var model = db.Adminler.Where(x => x.email == POSTA).FirstOrDefault();
            if (model != null)
            {
                Guid rasthele = Guid.NewGuid();
                model.Sifre = rasthele.ToString().Substring(0, 8);
                MailMessage mailim = new MailMessage();
                mailim.To.Add(POSTA);
                mailim.From = new MailAddress("bmmertkal@gmail.com");
                mailim.Subject = "ŞİFRE SIFIRLAMA İSTEDİĞİ";
                mailim.Body = "<h1>Merhaba Sayın Site Admini</h1>" + model.AdminKullaniciAdi + "<br>" + "<h2>Hesabınızın Yeni Şifresi:</h2>" + model.Sifre;
                mailim.IsBodyHtml = true;
                SmtpClient baglanti = new SmtpClient();
                baglanti.Credentials = new NetworkCredential("bmmertkal@gmail.com", "abc()123");
                baglanti.Port = 587;
                baglanti.Host = "smtp.gmail.com";
                baglanti.EnableSsl = true;
                baglanti.Send(mailim);
                model.Sifre = Sifrele.MD5sifrele(rasthele.ToString().Substring(0, 8));
                db.SaveChanges();
                return Json("1");
            }
            return Json("0");


        }
    }
}