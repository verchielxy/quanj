@extends('html')


@section('html')
	<section class="section">
		<img class="img-res" src="/imgs/production/1.png" alt="">
		<div class="overlay">
			<div class="display-table full-width full-height">
				<div class="display-tablecell">
					<div class="clearfix" style="margin-top: -3em;">
						<div class="col-sm-offset-1 col-sm-6 px0">
							<div class="clearfix pl2em">
								<img width="230" src="/imgs/logo3.png" alt="">
								<div class="clearfix c-white mb20px" style="font-size: 28px;">
									真VR极速智能设计，装企签单神器
								</div>
								<div class="clearfix mb2em">
									<a class="btn btn-download" href="">申请购买</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<section class="section py2em">
		<div class="container">
			<h4 class="title">智能设计 以设计师以一当十</h4>
			<p class="subtitle">快速绘制户型，一键智能生成设计方案，实时看预算</p>
			
			<div class="clearfix mt2em">
				<ul class="clearfix float-ul float-ul-3 production-ul">
					<li role="presentation" class="active">
				    	<a href="#tab_1" aria-controls="tab_1" role="tab" data-toggle="tab">
				    		绘制户型
				    	</a>
				    </li>
				    <li role="presentation">
				    	<a href="#tab_2" aria-controls="tab_2" role="tab" data-toggle="tab">
				    		一键智能设计
				    	</a>
				   	</li>
				   	<li role="presentation">
				    	<a href="#tab_3" aria-controls="tab_3" role="tab" data-toggle="tab">
				    		导出报价单
				    	</a>
				   	</li>
				</ul>
			</div>

			<div class="tab-content mt1em">
			    <div role="tabpanel" class="tab-pane fade in active" id="tab_1">
			    	<img class="img-res" src="/imgs/production/2.png" alt="">
			    </div>
			    <div role="tabpanel" class="tab-pane fade" id="tab_2">
			    	<img class="img-res" src="/imgs/production/2.png" alt="">
			    </div>
			    <div role="tabpanel" class="tab-pane fade" id="tab_3">
			    	<img class="img-res" src="/imgs/production/2.png" alt="">
			    </div>
			</div>
		</div>
	</section>

	<section class="section py2em mbg-gray">
		<div class="container">
			<h4 class="title">主材家具套餐内嵌 提高装企客单值</h4>
			<p class="subtitle">软件内置多款可售的主材，家具套餐，直接套用设计，一件下单购买</p>
			<img class="img-res mt2em mb1em" src="/imgs/production/3.png" alt="">
		</div>
	</section>

	<section class="section py2em">
		<div class="container">
			<h4 class="title">云管理后台 让企业</h4>
			<p class="subtitle">软件内置多款可售的主材，家具套餐，直接套用设计，一件下单购买</p>
			<img class="img-res mt2em mb1em" src="/imgs/production/4.png" alt="">
		</div>
	</section>

@endsection



@push('css2')
	<style type="text/css" media="screen">
		
	</style>
@endpush



@push('js2')
	<script type="text/javascript">
	$(function(){
		
	});
	</script>
@endpush