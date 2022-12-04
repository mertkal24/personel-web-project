using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MertKalKisisel.Models;

namespace MertKalKisisel.Areas.admin.Controllers
{
    public class YeteneklerController : Controller
    {
        KalMertModelEntities db = new KalMertModelEntities();
        guzel kk = new guzel();
        [HttpGet]
        public ActionResult Index()
        {
            kk.Yetenek = db.Yeteneklerim.ToList();
            return View(kk);
        }
        [HttpPost]
        public JsonResult GuncJson(int id)
        {
            var item = db.Yeteneklerim.FirstOrDefault(x => x.YetenekID == id);
            return Json(
              new
              {
                  Result = new
                  {
                      item.YetenekID,
                      item.YetenekAdi,                   

                  },
                  JsonRequestBehavior.AllowGet
              });

        }
        [HttpPost]
        public JsonResult Guncj(string id,string YET)
        {
            int ID = Convert.ToInt32(id);
            var yeni = db.Yeteneklerim.FirstOrDefault(x => x.YetenekID == ID);
            yeni.YetenekID = ID;
            yeni.YetenekAdi = YET;
            var durum = db.SaveChanges();
            if (durum > 0)
            {
                return Json("1");
                
            }
            else return Json('0');
        }
        [HttpPost]
       public JsonResult Sil(int id)
        {
            var item = db.Yeteneklerim.FirstOrDefault(x => x.YetenekID == id);
            db.Yeteneklerim.Remove(item);
            var durum = db.SaveChanges();
            if (durum == 1)
            {
                return Json("1");
            }
            else return Json("0");
        }
        public JsonResult EkleJson(string YET)
        {
            if (YET != "")
            {
                Yeteneklerim ig = new Yeteneklerim();
                ig.YetenekAdi = YET;
                db.Yeteneklerim.Add(ig);
                var durum = db.SaveChanges();
                if (durum == 1)
                {
                    return Json(1);
                }
                else return Json(0);
            }
            else return Json(2);

        }


    }
}