using System.Collections.Generic;
using TheEightSuite.Data.Models.WorkoutTracker;
using TheEightSuite.WebApp.BusinessObjects.Teams;
using TheEightSuite.WebApp.BusinessObjects.WorkoutTracker;

namespace TheEightSuite.WebApp.ViewModels
{
    public class SubmitResultForTeamVM
    {
        public string WorkoutId { get; set; }
        public WorkoutInfo WorkoutInfo { get; set; }
        public Dictionary<string, UserInfo> Rowers { get; set; }
        public List<Piece> Pieces { get; set; }
    }
}