using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;



namespace MertKalKisisel.Models
{
    public class guzel
    {
        public IEnumerable<Tanitim> Tanitim { get; set; }
        public IEnumerable<Yeteneklerim> Yetenek { get; set; }
        public IEnumerable<İlgiAlanlari> Ilgilan { get; set; }
        public IEnumerable<HAKKIMDA> Hakkımda{ get; set; }
        public IEnumerable<iletisim> iletisim { get; set; }
        public IEnumerable<Projeler> proje { get; set; }
        
    }
}