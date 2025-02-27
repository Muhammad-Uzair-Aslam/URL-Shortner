
import NotificationLoggedIn from "@/components/notificationLoggedIn/NotificationLoggedIn";
import EditForm from "@/components/editForm/EditForm";

export default function Page() {
  return (
    <div className="min-h-screen bg-[#0B101B] text-white">
      <div className="absolute inset-0">
        <div className="absolute inset-0" style={{
         backgroundImage: `url('./assets/images/Swirl.png')`, 
         backgroundSize: '100% 100%',
         backgroundRepeat: 'no-repeat',
        }} />
        <div className="absolute inset-0 " style={{
          backgroundImage: `url('./assets/images/Cubes.png')`, 
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          opacity: '0.8' 
        }} />
      </div>
            <nav className="relative z-10 flex justify-between items-center p-6">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
          Linkly
        </h1>
        <NotificationLoggedIn/>
        </nav>
        <EditForm/>
    </div>
  );
}
