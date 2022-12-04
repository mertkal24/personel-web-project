using MertKalKisisel.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.ModelBinding;
using System.Web.Mvc;
using System.Web.Security;

namespace MertKalKisisel.Areas.admin.Controllers
{
    
    public class AdminAnaController : Controller
    {
        KalMertModelEntities db = new KalMertModelEntities();
        guzel model = new guzel();
       
        [Authorize]
        public ActionResult Index()
        {           
            model.Hakkımda = db.HAKKIMDA.OrderByDescending(x => x.Id).Take(1).ToList();
            model.iletisim = db.iletisim.ToList();
            model.Ilgilan = db.İlgiAlanlari.OrderByDescending(x => x.ilgiAlaniID).Take(1).ToList();
            model.proje = db.Projeler.ToList();
            model.Tanitim = db.Tanitim.ToList();
            model.Yetenek = db.Yeteneklerim.OrderByDescending(x => x.YetenekID).Take(1).ToList();            
            return View(model);
        }    
    }
}