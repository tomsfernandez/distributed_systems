# Generated by the gRPC Python protocol compiler plugin. DO NOT EDIT!
import grpc

import empty_pb2 as empty__pb2


class HealthCheckStub(object):
  # missing associated documentation comment in .proto file
  pass

  def __init__(self, channel):
    """Constructor.

    Args:
      channel: A grpc.Channel.
    """
    self.Check = channel.unary_unary(
        '/store.HealthCheck/Check',
        request_serializer=empty__pb2.Empty.SerializeToString,
        response_deserializer=empty__pb2.Empty.FromString,
        )


class HealthCheckServicer(object):
  # missing associated documentation comment in .proto file
  pass

  def Check(self, request, context):
    # missing associated documentation comment in .proto file
    pass
    context.set_code(grpc.StatusCode.UNIMPLEMENTED)
    context.set_details('Method not implemented!')
    raise NotImplementedError('Method not implemented!')


def add_HealthCheckServicer_to_server(servicer, server):
  rpc_method_handlers = {
      'Check': grpc.unary_unary_rpc_method_handler(
          servicer.Check,
          request_deserializer=empty__pb2.Empty.FromString,
          response_serializer=empty__pb2.Empty.SerializeToString,
      ),
  }
  generic_handler = grpc.method_handlers_generic_handler(
      'store.HealthCheck', rpc_method_handlers)
  server.add_generic_rpc_handlers((generic_handler,))
