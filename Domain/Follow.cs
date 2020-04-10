namespace Domain
{
    public class Follow
    {
        public string FollowerId { get; set; }
        public virtual AppUser Follower { get; set; }
        public string FollowingId { get; set; }
        public virtual AppUser Following { get; set; }
    }
}