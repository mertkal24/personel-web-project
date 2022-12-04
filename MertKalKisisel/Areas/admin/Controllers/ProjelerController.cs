using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MertKalKisisel.Models;

namespace MertKalKisisel.Areas.admin.Controllers
{
    [Authorize]
    public class ProjelerController : Controller
    {
        KalMertModelEntities db = new KalMertModelEntities();
        guzel mert = new guzel();
       
        public ActionResult Index()
        {
            mert.proje = db.Projeler.ToList();
            return View(mert);
        }
        [HttpPost]
        public JsonResult GuncJson(int id)
        {
            var veri = db.Projeler.FirstOrDefault(x => x.IDProje == id);
            return Json(
                new
                {
                    Result = new
                    {
                        veri.IDProje,
                        veri.ProjeAd,
                        veri.ProjeAciklama,
                        veri.ProjeResim,
                        veri.eklemetarihi,                        

                    },
                    JsonRequestBehavior.AllowGet
                });
        }
        [HttpPost]
        public ActionResult Foto(int id)
        {
            var item = db.Projeler.FirstOrDefault(x => x.IDProje == id);

            if (Request.Files.Count > 0)
            {

                string dosyaadi, uzanti, yol;
                dosyaadi = Path.GetFileName(Request.Files[0].FileName);
                uzanti = Path.GetExtension(Request.Files[0].FileName);
                yol = "/Foto/" + dosyaadi;
                Request.Files[0].SaveAs(Server.MapPath(yol));
                item.ProjeResim = "/Foto/" + dosyaadi;
                db.SaveChanges();
                return Json("Fotoğraf Başarıyla Yüklendi");

            }
            else
            {
                return Json("Fotoğraf Seçmediniz");
            }
        }
        [HttpPost]
        public JsonResult GuncJ(string ID, string AD, string ACK ,string TRH)
        {
            DateTime aga = Convert.ToDateTime(TRH);
            int id = Convert.ToInt32(ID);
            var yeni = db.Projeler.FirstOrDefault(x => x.IDProje ==id);
            yeni.IDProje = id;
            yeni.ProjeAd = AD;
            yeni.ProjeAciklama =ACK;
            yeni.eklemetarihi = aga;
            var durum = db.SaveChanges();
            if (durum > 0) return Json("1");
            else return Json('0');

        }
        [HttpPost]
        public ActionResult EkleJson(string AD,string ACK,string TRH)
        {
           
            if (AD != "" && ACK!="" && TRH!="")
            {
                Projeler ig = new Projeler();
                ig.ProjeAd = AD;
                ig.ProjeAciklama = ACK;
                var trh = Convert.ToDateTime(TRH);
                ig.eklemetarihi = trh;
                db.Projeler.Add(ig);
                db.SaveChanges();
               var item= db.Projeler.OrderByDescending(x=>x.IDProje).First();  
                
                return Json(item.IDProje);
            }
            else return Json(2);

        }


        public ActionResult Guncelle(Projeler yeni)
        {
            var proje = db.Projeler.Find(yeni.IDProje);
            if (Request.Files.Count > 0)
            {
                string dosyaadi, yol;
                dosyaadi = Path.GetFileName(Request.Files[0].FileName);
                yol = "/Foto/ProjeFoto/" + dosyaadi;
                Request.Files[0].SaveAs(Server.MapPath(yol));
                yeni.ProjeResim = "/Foto/ProjeFoto/" + dosyaadi;          


            }
            proje.ProjeAciklama = yeni.ProjeAciklama;
            proje.IDProje = yeni.IDProje;
            proje.ProjeResim = yeni.ProjeResim;
            proje.ProjeAd = yeni.ProjeAd;
            db.SaveChanges();
            return RedirectToAction("Index", "Projeler", new { area = "admin" });
        }
        public JsonResult Sil(int id)
        {
            var item = db.Projeler.Find(id);
            db.Projeler.Remove(item);
            var durum = db.SaveChanges();
            if (durum == 1)
            {
                return Json("Silme İşlemi Başarılı");
            }
            else return Json("Başarısız");
        }



    }
}