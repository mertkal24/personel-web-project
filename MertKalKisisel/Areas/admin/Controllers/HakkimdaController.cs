using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.Remoting.Messaging;
using System.Web;
using System.Web.Mvc;
using MertKalKisisel.Models;

namespace MertKalKisisel.Areas.admin.Controllers
{
    [Authorize]
    public class HakkimdaController : Controller
    {
        KalMertModelEntities db = new KalMertModelEntities();
       [HttpGet]
        public ActionResult Index()
        {
            var yahakk = db.HAKKIMDA.ToList();
            return View(yahakk);
        }     
       
        [HttpPost]
        public JsonResult GuncJson(int id)
        {
            var veri = db.HAKKIMDA.FirstOrDefault(x => x.Id == id);          
            return Json(
                new
                {
                    Result =new
                    {
                      veri.Id,
                      veri.foto,
                      veri.baslik,
                      veri.aciklama,
                      veri.cv

                    },JsonRequestBehavior.AllowGet
                });         
        }
        [HttpPost]
        public JsonResult GuncJ(string id ,string baslik,string ack)        {
            
            int ID = Convert.ToInt32(id);
            var yeni = db.HAKKIMDA.FirstOrDefault(x => x.Id == ID);         
            yeni.Id = ID;           
            yeni.baslik = baslik;
            yeni.aciklama = ack;          
            var durum = db.SaveChanges();
            if (durum > 0) return Json("1");
            else return Json('0');

        }


        
        public JsonResult Veriler()
        {
            var veriler = db.HAKKIMDA.ToList();
            return Json(
                new
                {
                    Result = from obj in veriler
                             select new
                             {
                                 obj.Id,
                                 obj.foto,
                                 obj.baslik,
                                 obj.aciklama,
                                 obj.cv
                             }
                },JsonRequestBehavior.AllowGet
                );         


        }   
        [HttpPost]
        public ActionResult Foto(int id)
        {
            var item = db.HAKKIMDA.FirstOrDefault(x => x.Id == id);

            if (Request.Files.Count > 0)
            {

                string dosyaadi, uzanti, yol;
                dosyaadi = Path.GetFileName(Request.Files[0].FileName);
                uzanti = Path.GetExtension(Request.Files[0].FileName);
                yol = "/Foto/" + dosyaadi;
                Request.Files[0].SaveAs(Server.MapPath(yol));
                item.foto = "/Foto/" + dosyaadi;
                db.SaveChanges();
                return Json("Fotoğraf Başarıyla Yüklendi");
               
            }
            else
            {
                return Json("Fotoğraf Seçmediniz");
            }
        }
        [HttpPost]
        public ActionResult CvGnc(int id)
        {
            var item = db.HAKKIMDA.FirstOrDefault(x => x.Id == id);

            if (Request.Files.Count > 0)
            {

                string dosyaadi, uzanti, yol;
                dosyaadi = Path.GetFileName(Request.Files[0].FileName);
                uzanti = Path.GetExtension(Request.Files[0].FileName);
                yol = "/files/" + dosyaadi;
                Request.Files[0].SaveAs(Server.MapPath(yol));
                item.cv = "/files/" + dosyaadi;
                db.SaveChanges();
                return Json("Ekleme İşlemi Başarılı");
            }
            else
            {
                return Json("Ekleme İşlemi Başarılı");
            }
        }


    }
}