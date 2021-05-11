using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace iWonder.Models
{
    public class ServerResult
    {
        public bool Success { get; set; }
        public string ErrorMessage { get; set; }
        public int Code { get; set; }
    }

    public class ServerResult<T> : ServerResult
    {
        public T Data { get; set; }
    }
}
