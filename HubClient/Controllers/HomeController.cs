using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HubClient.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Message = "макет электроавтозаправочной станции на основе Смарт-контрактов между IoT-устройствами";

            return View();
        }

        public ActionResult DevBoard()
        {
            ViewBag.Message = "сводный мониторинг потоков данных для отладки и контроля стабильности системы";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "пишите/звоните - ждем Ваших предложений и пожеланий по улучшению работы системы";

            return View();
        }

        public ActionResult Certification()
        {
            ViewBag.Message = "участвует в обеспечении безопасности смарт-контрактов";

            return View();
        }

        public ActionResult Contracts()
        {
            ViewBag.Message = "обеспечивает сохранность в облаке 'BlockChain' событий по договорам";

            return View();
        }

        public ActionResult Customer()
        {
            ViewBag.Message = "управление и просмотр состояния работы системы пользователем";

            return View();
        }

        public ActionResult Market()
        {
            ViewBag.Message = "мониторинг предложений от поставщиков электроэнергии на рынке электроэнергии";

            return View();
        }

        public ActionResult Supplier()
        {
            ViewBag.Message = "состояние продаж электроэнергии клиентам электроавтозаправочной станции";

            return View();
        }

    }
}