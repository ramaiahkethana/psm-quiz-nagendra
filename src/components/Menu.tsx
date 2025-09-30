import React, { useState } from 'react';
import { Button } from './ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter 
} from './ui/dialog';
import { MoreVertical, Trash2 } from 'lucide-react';

interface MenuProps {
  onClearStorage: () => void;
}

export const Menu: React.FC<MenuProps> = ({ onClearStorage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

  const handleClearStorageClick = () => {
    setIsMenuOpen(false);
    setIsConfirmDialogOpen(true);
  };

  const handleConfirmClear = () => {
    onClearStorage();
    setIsConfirmDialogOpen(false);
  };

  const handleCancelClear = () => {
    setIsConfirmDialogOpen(false);
  };

  return (
    <>
      {/* Menu Button */}
      <div className="relative">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="relative"
        >
          <MoreVertical className="h-5 w-5" />
        </Button>

        {/* Dropdown Menu */}
        {isMenuOpen && (
          <>
            <div 
              className="fixed inset-0 z-10" 
              onClick={() => setIsMenuOpen(false)}
            />
            <div className="absolute right-0 top-full mt-1 z-20 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
              <div className="py-1">
                <button
                  onClick={handleClearStorageClick}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear Storage
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Trash2 className="h-5 w-5 mr-2 text-red-500" />
              Clear Storage
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to clear all saved game data? This action cannot be undone.
              All progress, scores, and question states will be permanently lost.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button 
              variant="outline" 
              onClick={handleCancelClear}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleConfirmClear}
              className="bg-red-500 hover:bg-red-600"
            >
              Clear All Data
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};