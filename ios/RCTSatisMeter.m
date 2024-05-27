//
//  RCTSatisMeter.m
//  clxAuthDemo
//
//  Created by Yunan Kholilul on 27/05/24.
//

#import "RCTSatisMeter.h"
#import "SatisMeter/SatisMeter.h"

@implementation RCTSatisMeter


- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}


RCT_EXPORT_MODULE();

RCT_REMAP_METHOD(hook,
    userId:(nonnull NSString *)userId
    writeKey:(nonnull NSString *)writeKey
    traits:(NSDictionary *)traits
    callback:(RCTResponseSenderBlock)callback)
{
    callback(@[[NSString stringWithFormat: @"SatisMeter installation successful... userId: %@ writeKey: %@", userId, writeKey]]);
    
    [[SatisMeter sharedInstance] identifyUserWithUserId: userId
                                               writeKey: writeKey
                                    andTraitsDictionary: traits];

}


@end
