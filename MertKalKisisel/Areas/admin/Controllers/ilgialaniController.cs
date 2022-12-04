using MertKalKisisel.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Security.Cryptography;
using System.Security.Cryptography.X509Certificates;
using System.Web;
using System.Web.Mvc;

namespace MertKalKisisel.Areas.admin.Controllers
{
    [Authorize]
    public class ilgialaniController : Controller
    {
        KalMertModelEntities db = new KalMertModelEntities();      

        // GET: admin/ilgialani

        public ActionResult Index()
        {
            var item = db.İlgiAlanlari.ToList();
            return View(item);
        }
        public JsonResult Veriler()
        {
            var veriler = db.İlgiAlanlari.ToList();
            return Json(
                new
                {
                    Result = from obj in veriler
                             select new
                             {
                                 obj.ilgiAlaniID,                                 
                                 obj.ilgiAlanlarim,                                 
                             }
                }, JsonRequestBehavior.AllowGet
                );


        }
        public JsonResult Sil(int id)
        {
            var item = db.İlgiAlanlari.Find(id);
            db.İlgiAlanlari.Remove(item);
            var durum = db.SaveChanges();
            if (durum == 1)
            {
                return Json("Silme İşlemi Başarılı");
            }
            else return Json("Başarısız");
        }
        [HttpPost]
        public JsonResult GuncJson(int id)
        {
            var veri = db.İlgiAlanlari.FirstOrDefault(x => x.ilgiAlaniID == id);
            return Json(
                new
                {
                    Result = new
                    {
                        veri.ilgiAlaniID,
                        veri.ilgiAlanlarim,                        

                    },
                    JsonRequestBehavior.AllowGet
                });
        }
        [HttpPost]
        public JsonResult GuncJ(string id,string frm)
        {

            int ID = Convert.ToInt32(id);
            var yeni = db.İlgiAlanlari.FirstOrDefault(x => x.ilgiAlaniID == ID);
            yeni.ilgiAlaniID = ID;
            yeni.ilgiAlanlarim =frm ;           
            var durum = db.SaveChanges();
            if (durum > 0) return Json("1");
            else return Json('0');

        }
        public JsonResult EkleJson(string ilgi)
        {
            if (ilgi != "")
            {
                İlgiAlanlari ig = new İlgiAlanlari();
                ig.ilgiAlanlarim = ilgi;
                db.İlgiAlanlari.Add(ig);
                var toplam = db.İlgiAlanlari.OrderByDescending(x => x.ilgiAlaniID).First();
                var tplm = toplam.ilgiAlaniID;
                var durum = db.SaveChanges();
                if (durum == 1)
                {
                    return Json(tplm);
                }
                else return Json(0);
            }
            else return Json(2);

        }
       


    }
}