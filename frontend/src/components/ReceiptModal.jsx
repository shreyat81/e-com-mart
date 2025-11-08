import { useEffect } from 'react';

function ReceiptModal({ receiptData, onClose }) {
  // Close modal on Escape key press
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  // Format timestamp
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto animate-fade-in">
      {/* Backdrop with blur */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="flex min-h-screen items-center justify-center p-3 sm:p-4">
        <div className="relative bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-lg w-full p-5 sm:p-6 md:p-8 transform transition-all animate-scale-in border-2 border-green-100">
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-lg hover:bg-gray-100 active:bg-gray-200 touch-manipulation"
            aria-label="Close modal"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Success Animation */}
          <div className="flex justify-center mb-4 sm:mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-20"></div>
              <div className="relative rounded-full bg-gradient-to-br from-green-400 to-emerald-500 p-3 sm:p-4 shadow-lg">
                <svg
                  className="h-12 w-12 sm:h-16 sm:w-16 text-white animate-check"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-gray-800 mb-2">
            {receiptData.message || 'Order Confirmed!'}
          </h2>
          <p className="text-center text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
            Thank you for your purchase! 🎉
          </p>

          {/* Divider */}
          <div className="border-t-2 border-gray-100 my-4 sm:my-6"></div>

          {/* Receipt Details */}
          <div className="space-y-3 sm:space-y-4 bg-gradient-to-br from-gray-50 to-blue-50 p-4 sm:p-6 rounded-xl border border-gray-200">
            {/* Customer Name */}
            {receiptData.orderDetails?.customerName && (
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-2">
                <span className="text-gray-600 font-medium flex items-center gap-2 text-sm sm:text-base">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Customer:
                </span>
                <span className="font-bold text-gray-800 text-sm sm:text-base break-words sm:text-right">
                  {receiptData.orderDetails.customerName}
                </span>
              </div>
            )}

            {/* Customer Email */}
            {receiptData.orderDetails?.customerEmail && (
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-2">
                <span className="text-gray-600 font-medium flex items-center gap-2 text-sm sm:text-base">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Email:
                </span>
                <span className="font-semibold text-gray-700 text-xs sm:text-sm break-all sm:text-right">
                  {receiptData.orderDetails.customerEmail}
                </span>
              </div>
            )}

            {/* Item Count */}
            {receiptData.orderDetails?.itemCount && (
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-2">
                <span className="text-gray-600 font-medium flex items-center gap-2 text-sm sm:text-base">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  Items:
                </span>
                <span className="font-bold bg-blue-100 text-blue-700 px-2 sm:px-3 py-1 rounded-lg text-sm sm:text-base inline-block w-fit">
                  {receiptData.orderDetails.itemCount}
                </span>
              </div>
            )}

            {/* Divider */}
            <div className="border-t-2 border-gray-200 my-3 sm:my-4"></div>

            {/* Total Amount */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 bg-white p-3 sm:p-4 rounded-lg shadow-sm">
              <span className="text-lg sm:text-xl font-bold text-gray-800 flex items-center gap-2">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Total:
              </span>
              <span className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
                ₹{receiptData.total.toLocaleString('en-IN')}
              </span>
            </div>

            {/* Timestamp */}
            {receiptData.timestamp && (
              <div className="text-center text-[10px] sm:text-xs text-gray-500 pt-1 sm:pt-2 flex items-center justify-center gap-2">
                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {formatDate(receiptData.timestamp)}
              </div>
            )}
          </div>

          {/* Success Message */}
          <div className="mt-4 sm:mt-6 p-3 sm:p-5 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-2 border-green-200">
            <p className="text-center text-xs sm:text-sm text-green-800 font-medium flex items-center justify-center gap-2">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              A confirmation email has been sent to your inbox
            </p>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="mt-4 sm:mt-6 w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-xl font-bold text-base sm:text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:scale-95 transition-all duration-300 touch-manipulation"
          >
            <div className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              Continue Shopping
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReceiptModal;
