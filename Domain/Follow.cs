namespace Domain
{
    public class Follow
    {
        public string FollowerId { get; set; }
        public AppUser Follower { get; set; }
        public FollowingId { get; set; }
        public virtual AppUser Following { get; set; }
    }
}
