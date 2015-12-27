using System.Collections.Generic;
using System.Threading.Tasks;
using Raven.Client;
using TheEight.Common.Database.Entities.Accounts;
using TheEight.Common.Database.Entities.Messaging;
using TheEight.Common.Domain.Messaging;

namespace TheEight.QueueHandlers.Services.Messaging
{
    public class NotificationPreferencesService
    {
        private readonly IAsyncDocumentSession _ravenSession;

        public NotificationPreferencesService(IAsyncDocumentSession ravenSession)
        {
            _ravenSession = ravenSession;
        }

        public IDictionary<string, MessageMethod> GetMessageMethod(IEnumerable<string> userId, 
            MessageType messageType)
        {
            _ravenSession.Query<User>();
            return new Dictionary<string, MessageMethod>();
        }
    }

    public class MessageBatchProcessor
    {
        private readonly EmailSender _emailSender;
        private readonly TextMessageSender _textMessageSender;
        private readonly NotificationPreferencesService _notificationPreferencesService;

        public MessageBatchProcessor(EmailSender emailSender, TextMessageSender textMessageSender, 
            NotificationPreferencesService notificationPreferencesService)
        {
            _emailSender = emailSender;
            _textMessageSender = textMessageSender;
            _notificationPreferencesService = notificationPreferencesService;
        }

        public async Task ProcessMessageBatch(MessageBatch messageBatch)
        {
            
        }
    }
}