using System.Collections.Generic;

namespace TheEight.Domain.WorkoutTracker
{
    public class Workout
    {
        public string Id { get; set; }
        public WorkoutInfo WorkoutInfo { get; set; }
        public IList<Piece> Pieces { get; set; } = new List<Piece>();
    }
}