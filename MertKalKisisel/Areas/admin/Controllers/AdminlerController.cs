using MertKalKisisel.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Web;
using System.Web.Mvc;

namespace MertKalKisisel.Areas.admin.Controllers
{
    [Authorize]
    public class AdminlerController : Controller
    {
        KalMertModelEntities db = new KalMertModelEntities();
        // GET: admin/Admin
        public ActionResult Index()
        {           
            return View(db.Adminler.ToList());
        }               
        public JsonResult Sil(int id)
        {
            var item = db.Adminler.FirstOrDefault(x => x.Id == id);
            db.Adminler.Remove(item);
            var durum = db.SaveChanges();
            if (durum == 1)
            {
                return Json("1");
            }
            else return Json("0");
        }
        public JsonResult EkleJson(string KAD, string SIF,string GOOG,string POSTA,string FACE,string TWIT)
        {
            if (KAD == "") return Json('2');
            if (SIF == "") return Json('2');
            if (GOOG == "") return Json('2');
            if (POSTA == "") return Json('2');
            if (FACE == "") return Json('2');
            if (TWIT == "") return Json('2');
            Adminler ig = new Adminler();
            ig.AdminKullaniciAdi = KAD;
            ig.Sifre = Sifrele.MD5sifrele(SIF);
            ig.googlehesap = GOOG;
            ig.email = POSTA;
            ig.Facebook = FACE;
            ig.Twitter = TWIT;
            db.Adminler.Add(ig);
            db.SaveChanges();
            var item = db.Adminler.OrderByDescending(x => x.Id).First();
            return Json(item.Id);              
           
        }
        [HttpPost]
        public JsonResult GuncJson(int id)
        {
            var item = db.Adminler.FirstOrDefault(x => x.Id == id);
            return Json(
              new
              {
                  Result = new
                  {
                      item.Id,
                      item.AdminKullaniciAdi,
                      item.Sifre,
                      item.googlehesap,
                      item.email,
                      item.Facebook,                      
                      item.İnstagram,
                      item.Twitter,

                  },
                  JsonRequestBehavior.AllowGet
              });

        }
        [HttpPost]
        public JsonResult Guncj(string ID, string KAD,string SIF,string GOG,string POSTA,string FACE,string INSTA,string TWIT)
        {
            if (ID == "") return Json("0");
            if (KAD == "") return Json("0");
            if (SIF == "") return Json("0");
            if (GOG == "") return Json("0");
            if (POSTA == "") return Json("0");
            if (FACE == "") return Json("0");
            if (INSTA == "") return Json("0");
            if (TWIT == "") return Json("0");
            int id= Convert.ToInt32(ID);
            var yeni = db.Adminler.FirstOrDefault(x => x.Id == id);
            yeni.Id = id;
            yeni.AdminKullaniciAdi = KAD;
            yeni.Sifre = Sifrele.MD5sifrele(SIF);
            yeni.googlehesap = GOG;
            yeni.email = POSTA;
            yeni.Facebook = FACE;
            yeni.İnstagram = INSTA;
            yeni.Twitter = TWIT;
            var durum = db.SaveChanges();
            if (durum > 0)
            {
                return Json("1");

            }
            else return Json('0');
        }





    }
}