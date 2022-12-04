using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Security.Cryptography.Xml;
using System.Web;
using System.Web.ModelBinding;
using System.Web.Mvc;
using System.Web.UI.WebControls;
using MertKalKisisel.Models;


namespace MertKalKisisel.Controllers
{
    
    public class HomeController : Controller
    {
        KalMertModelEntities data = new KalMertModelEntities();
        guzel gmodel = new guzel();          
        [Route("Anasayfa")]
        public ActionResult Index()
        {

            ViewBag.unvan = data.Tanitim.Find(1).unvan;
            ViewBag.adsoyad = data.Tanitim.Find(1).AdSoyad;
            ViewBag.adres = data.Tanitim.Find(1).adress;
            ViewBag.telno = data.Tanitim.Find(1).telno;
            ViewBag.email = data.Tanitim.Find(1).email;
            gmodel.Tanitim = data.Tanitim.OrderByDescending(x => x.ID).Take(1);
            gmodel.Yetenek = data.Yeteneklerim.ToList();
            gmodel.Ilgilan = data.İlgiAlanlari.ToList();
            gmodel.proje = data.Projeler.OrderByDescending(x => x.eklemetarihi).Take(5).ToList();            
            return View(gmodel);
            
        }

        public ActionResult About()
        {
            ViewBag.unvan = data.Tanitim.Find(1).unvan;
            ViewBag.adsoyad = data.Tanitim.Find(1).AdSoyad;
            ViewBag.adres = data.Tanitim.Find(1).adress;
            ViewBag.telno = data.Tanitim.Find(1).telno;
            ViewBag.email = data.Tanitim.Find(1).email;
            var item = data.HAKKIMDA.ToList();
            return View(item);
        }
        
        public ActionResult Contact()
        {
            ViewBag.unvan = data.Tanitim.Find(1).unvan;
            ViewBag.adsoyad = data.Tanitim.Find(1).AdSoyad;
            ViewBag.adres = data.Tanitim.Find(1).adress;
            ViewBag.telno = data.Tanitim.Find(1).telno;
            ViewBag.email = data.Tanitim.Find(1).email;          
           return View();
        }
        [HttpPost]
        public ActionResult Contact(iletisim a)
        {
            ViewBag.unvan = data.Tanitim.Find(1).unvan;
            ViewBag.adsoyad = data.Tanitim.Find(1).AdSoyad;
            ViewBag.adres = data.Tanitim.Find(1).adress;
            ViewBag.telno = data.Tanitim.Find(1).telno;
            ViewBag.email = data.Tanitim.Find(1).email;            
            data.iletisim.Add(a);
            data.SaveChanges();
            return RedirectToAction("Contact", "Home");
        }
        public ActionResult Projeler()
        {
            ViewBag.unvan = data.Tanitim.Find(1).unvan;
            ViewBag.adsoyad = data.Tanitim.Find(1).AdSoyad;
            ViewBag.adres = data.Tanitim.Find(1).adress;
            ViewBag.telno = data.Tanitim.Find(1).telno;
            ViewBag.email = data.Tanitim.Find(1).email;          
            var proje = data.Projeler.OrderByDescending(x => x.eklemetarihi).ToList();
            return View(proje);
        }
        public ActionResult ProjeAyrinti(int id)
        {
            ViewBag.unvan = data.Tanitim.Find(1).unvan;
            ViewBag.adsoyad = data.Tanitim.Find(1).AdSoyad;
            ViewBag.adres = data.Tanitim.Find(1).adress;
            ViewBag.telno = data.Tanitim.Find(1).telno;
            ViewBag.email = data.Tanitim.Find(1).email;           
            ViewBag.ID = data.Projeler.Find(id).IDProje;
            ViewBag.foto = data.Projeler.Find(id).ProjeResim;
            ViewBag.adi = data.Projeler.Find(id).ProjeAd;
            ViewBag.aciklama = data.Projeler.Find(id).ProjeAciklama;
            return View();
        }
    }
}