using System;
using System.Collections.Generic;
using System.Text;

namespace Entities.DTO
{
    public class SurveyAnswerDto
    {
        public IEnumerable<AnswerCreationDto> Answers { get; set; }
    }
}
