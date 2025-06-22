import { MessageSquare, User } from "lucide-react";

const NoUserSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-base-100/50">
      <div className="max-w-md text-center space-y-6">
        {/* Icon Display */}
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div
              className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center text-bamboo
             justify-center animate-bounce"
            >
              <User className="w-16 h-16 text-bamboo "/>
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <h2 className="text-2xl font-bold text-bamboo">Welcome to BAMBOO COMMUNITY!</h2>
        <p className="text-base-content/60 text-textbox">
          
        </p>
      </div>
    </div>
  );
};

export default NoUserSelected;