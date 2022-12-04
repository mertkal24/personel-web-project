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
    public class TanitimController : Controller
    {
        KalMertModelEntities db = new KalMertModelEntities();
        guzel model = new guzel();
      
        public ActionResult Index()
        {
            model.Tanitim = db.Tanitim.ToList();
            return View(model);
        }        
        [HttpPost]
        public JsonResult GuncJson(int id)
        {
            var veri = db.Tanitim.FirstOrDefault(x => x.ID == id);
            return Json(
                new
                {
                    Result = new
                    {
                        veri.ID,
                        veri.foto,
                        veri.AdSoyad,
                        veri.email,
                        veri.telno,
                        veri.lise,
                        veri.uni,
                        veri.unvan,
                        veri.adress

                    },
                    JsonRequestBehavior.AllowGet
                });
        }
        [HttpPost]
        public JsonResult GuncJ(string id, string ad, string lise, string uni, string unvan, string telno, string email, string adress)
        {
            int kd = Convert.ToInt32(id);
            var yeni = db.Tanitim.FirstOrDefault(x => x.ID ==kd );           
            yeni.AdSoyad = ad;
            yeni.lise = lise;
            yeni.uni = uni;
            yeni.unvan = unvan;
            yeni.telno = telno;
            yeni.email = email;
            yeni.adress = adress;          
            var durum = db.SaveChanges();
            if (durum > 0) return Json("1");
            else return Json('0');

        }
        [HttpPost]
        public ActionResult Foto(int id)
        {
            var item = db.Tanitim.FirstOrDefault(x => x.ID == id);
            if (Request.Files.Count > 0)
            {

                string dosyaadi, uzanti, yol;
                dosyaadi = Path.GetFileName(Request.Files[0].FileName);
                uzanti = Path.GetExtension(Request.Files[0].FileName);
                yol = "/Foto/" + dosyaadi;
                Request.Files[0].SaveAs(Server.MapPath(yol));
                item.foto = "/Foto/" + dosyaadi;
                db.SaveChanges();
                return Json("Yükleme Başarılı");

            }
            else
            {
                return Json("No files selected.");
            }
        }


    }
}