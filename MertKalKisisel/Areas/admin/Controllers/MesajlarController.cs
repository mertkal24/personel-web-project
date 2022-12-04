using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Web;
using System.Web.Mvc;
using MertKalKisisel.Models;

namespace MertKalKisisel.Areas.admin.Controllers
{
    [Authorize]
    public class MesajlarController : Controller
    {
        KalMertModelEntities db = new KalMertModelEntities();       
       
        public ActionResult Index()
        {
            guzel model = new guzel();
            model.iletisim = db.iletisim.ToList();
            return View(model);
        }     
        [HttpPost]
        public JsonResult Sil(int id)
        {
            var dur = db.iletisim.FirstOrDefault(x => x.Id == id);            
            db.iletisim.Remove(dur);
            var durum = db.SaveChanges();
            if (durum==1)
            {
                return Json("Silme İşlemi Başarılı");
            }
            else
            {
                return Json("Silinemedi");
            }
            
        }
        public JsonResult Veriler()
        {
            var veriler = db.iletisim.ToList();
            return Json(
                new
                {
                    Result = from obj in veriler
                             select new
                             {
                                 obj.Id,
                                 obj.Ad,
                                 obj.email,
                                 obj.telno,
                                 obj.mesaj
                             }
                }, JsonRequestBehavior.AllowGet
                );


        }
        public JsonResult Mail(string email,string msg)
        {
            
            MailMessage mailim = new MailMessage();
            mailim.To.Add("bmmertkal@gmail.com");
            mailim.From = new MailAddress(email);
            mailim.Subject = "Benimle İletişim Kurduguğunuz İçin Teşekkür Ederim";
            mailim.Body = msg;
            mailim.IsBodyHtml = true;
            SmtpClient baglanti = new SmtpClient();
            baglanti.Credentials = new NetworkCredential("bmmertkal@gmail.com", "abc()123");
            baglanti.Port = 587;
            baglanti.Host = "smtp.gmail.com";
            baglanti.EnableSsl = true; 
            baglanti.Send(mailim);
            return Json(1);

        }
        [HttpPost]
        public JsonResult MailJson(int id)
        {
            var veri = db.iletisim.FirstOrDefault(x => x.Id == id);
            return Json(
                new
                {
                    Result = new
                    {
                        veri.Id,
                        veri.Ad,
                        veri.email,
                        veri.telno,
                        veri.mesaj

                    },
                    JsonRequestBehavior.AllowGet
                });
        }
        [HttpPost]
        public JsonResult MailJ(string id , string msg)
        {
            if(id!=null && msg != null) {
            int ID = Convert.ToInt32(id);
            var yeni = db.iletisim.FirstOrDefault(x => x.Id == ID);
            MailMessage mailim = new MailMessage();
            mailim.To.Add(yeni.email);
            mailim.From = new MailAddress("bmmertkal@gmail.com");
            mailim.Subject = "Benimle İletişim Kurduguğunuz İçin Teşekkür Ederim";
            mailim.Body = "Merhaba"+" "+yeni.Ad+"<br/>"+msg;
            mailim.IsBodyHtml = true;
            SmtpClient baglanti = new SmtpClient();
            baglanti.Credentials = new NetworkCredential("bmmertkal@gmail.com", "abc()123");
            baglanti.Port = 587;
            baglanti.Host = "smtp.gmail.com";
            baglanti.EnableSsl = true;
            baglanti.Send(mailim);
                return Json(1);
            }
            return Json(0);
           



        }

    }
}